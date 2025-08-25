-- Drop existing permissive RLS policies
-- We are dropping policies with the specific name "Enable all for anon users"
-- If you have other policies, they will remain.
DROP POLICY IF EXISTS "Enable all for anon users" ON public.recipes;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.ingredients;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.recipe_ingredients;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.cakes;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.cake_recipes;

-- Create new RLS policies for public.recipes
-- This policy ensures that users can only interact with rows where the user_id matches their authenticated user ID.
-- auth.uid() is a Supabase function that returns the ID of the currently authenticated user.
CREATE POLICY user_access_policy ON public.recipes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create new RLS policies for public.ingredients
CREATE POLICY user_access_policy ON public.ingredients
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create new RLS policies for public.recipe_ingredients
CREATE POLICY user_access_policy ON public.recipe_ingredients
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create new RLS policies for public.cakes
CREATE POLICY user_access_policy ON public.cakes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create new RLS policies for public.cake_recipes
CREATE POLICY user_access_policy ON public.cake_recipes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
