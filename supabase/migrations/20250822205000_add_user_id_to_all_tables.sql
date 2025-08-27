-- Migration to add user_id column to tables and link to auth.users

DO $$
DECLARE
    -- Variable to hold the user's ID for the migration
    user_to_use_id UUID;
    -- Variable to hold the ID of a potentially created temporary user
    temp_user_id UUID := NULL;
    -- Variable to hold an instance ID
    instance_uuid UUID;
BEGIN
    -- Temporarily disable RLS for auth.users if needed to fetch a user_id
    -- This step might not be strictly necessary if RLS on auth.users is not yet
    -- in effect or if the migration runs with an admin role.
    -- However, it's a safeguard for complex RLS setups.
    -- IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable all for anon users' AND tablename = 'users') THEN
    --     ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
    -- END IF;

    -- Try to get an existing instance ID, or use a default if none exists
    SELECT id INTO instance_uuid FROM auth.instances LIMIT 1;
    IF instance_uuid IS NULL THEN
        instance_uuid := '00000000-0000-0000-0000-000000000000'; -- Default/placeholder instance ID
    END IF;

    -- Get the ID of the first user in auth.users
    SELECT id INTO user_to_use_id FROM auth.users LIMIT 1;

    -- If no user is found, create a temporary one and use its ID
    IF user_to_use_id IS NULL THEN
        INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, instance_id, aud, role, created_at, updated_at)
        VALUES (
            gen_random_uuid(),
            'migration_temp_user_' || gen_random_uuid() || '@example.com',
            'dummy_password_hash_for_migration',
            now(),
            instance_uuid,
            'authenticated',
            'authenticated',
            now(),
            now()
        )
        RETURNING id INTO user_to_use_id;
        temp_user_id := user_to_use_id;
    END IF;

    -- Add user_id column as nullable
    ALTER TABLE public.recipes ADD COLUMN user_id UUID;
    ALTER TABLE public.ingredients ADD COLUMN user_id UUID;
    ALTER TABLE public.recipe_ingredients ADD COLUMN user_id UUID;
    ALTER TABLE public.cakes ADD COLUMN user_id UUID;
    ALTER TABLE public.cake_recipes ADD COLUMN user_id UUID;

    -- Update existing rows with the first user's ID
    UPDATE public.recipes SET user_id = user_to_use_id WHERE user_id IS NULL;
    UPDATE public.ingredients SET user_id = user_to_use_id WHERE user_id IS NULL;
    UPDATE public.recipe_ingredients SET user_id = user_to_use_id WHERE user_id IS NULL;
    UPDATE public.cakes SET user_id = user_to_use_id WHERE user_id IS NULL;
    UPDATE public.cake_recipes SET user_id = user_to_use_id WHERE user_id IS NULL;

    -- Alter column to be NOT NULL
    ALTER TABLE public.recipes ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.ingredients ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.recipe_ingredients ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.cakes ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.cake_recipes ALTER COLUMN user_id SET NOT NULL;

    -- Add foreign key constraints to auth.users
    ALTER TABLE public.recipes ADD CONSTRAINT fk_user_recipes
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

    ALTER TABLE public.ingredients ADD CONSTRAINT fk_user_ingredients
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

    ALTER TABLE public.recipe_ingredients ADD CONSTRAINT fk_user_recipe_ingredients
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

    ALTER TABLE public.cakes ADD CONSTRAINT fk_user_cakes
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

    ALTER TABLE public.cake_recipes ADD CONSTRAINT fk_user_cake_recipes
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

    -- Re-enable RLS for auth.users if it was temporarily disabled
    -- IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable all for anon users' AND tablename = 'users') THEN
    --     ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
    -- END IF;

    -- Clean up temporary user if one was created
    IF temp_user_id IS NOT NULL THEN
        DELETE FROM auth.users WHERE id = temp_user_id;
    END IF;

END $$;
