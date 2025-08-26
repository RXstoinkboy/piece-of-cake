-- Migration to add user_id column to tables and link to auth.users

DO $$
DECLARE
    -- Variable to hold the first user's ID
    first_user_id UUID;
BEGIN
    -- Temporarily disable RLS for auth.users if needed to fetch a user_id
    -- This step might not be strictly necessary if RLS on auth.users is not yet
    -- in effect or if the migration runs with an admin role.
    -- However, it's a safeguard for complex RLS setups.
    -- IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable all for anon users' AND tablename = 'users') THEN
    --     ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
    -- END IF;

    -- Get the ID of the first user in auth.users
    -- This assumes there is at least one user. If not, this will fail.
    SELECT id INTO first_user_id FROM auth.users LIMIT 1;

    -- If no user is found, raise an error.
    IF first_user_id IS NULL THEN
        RAISE EXCEPTION 'No users found in auth.users table. Please create at least one user before running this migration.';
    END IF;

    -- Add user_id column as nullable
    ALTER TABLE public.recipes ADD COLUMN user_id UUID;
    ALTER TABLE public.ingredients ADD COLUMN user_id UUID;
    ALTER TABLE public.recipe_ingredients ADD COLUMN user_id UUID;
    ALTER TABLE public.cakes ADD COLUMN user_id UUID;
    ALTER TABLE public.cake_recipes ADD COLUMN user_id UUID;

    -- Update existing rows with the first user's ID
    UPDATE public.recipes SET user_id = first_user_id WHERE user_id IS NULL;
    UPDATE public.ingredients SET user_id = first_user_id WHERE user_id IS NULL;
    UPDATE public.recipe_ingredients SET user_id = first_user_id WHERE user_id IS NULL;
    UPDATE public.cakes SET user_id = first_user_id WHERE user_id IS NULL;
    UPDATE public.cake_recipes SET user_id = first_user_id WHERE user_id IS NULL;

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

END $$;
