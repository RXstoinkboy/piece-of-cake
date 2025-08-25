-- Fix RLS insert policy by adding DEFAULT auth.uid() to user_id columns and re-creating policies

-- Drop existing RLS policies (from the previous migration)
DROP POLICY IF EXISTS user_access_policy ON public.recipes;
DROP POLICY IF EXISTS user_access_policy ON public.ingredients;
DROP POLICY IF EXISTS user_access_policy ON public.recipe_ingredients;
DROP POLICY IF EXISTS user_access_policy ON public.cakes;
DROP POLICY IF EXISTS user_access_policy ON public.cake_recipes;

-- Add DEFAULT auth.uid() to the user_id columns
ALTER TABLE public.recipes ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.ingredients ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.recipe_ingredients ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.cakes ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.cake_recipes ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Re-create RLS policies for public.recipes
CREATE POLICY user_access_policy ON public.recipes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Re-create RLS policies for public.ingredients
CREATE POLICY user_access_policy ON public.ingredients
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Re-create RLS policies for public.recipe_ingredients
CREATE POLICY user_access_policy ON public.recipe_ingredients
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Re-create RLS policies for public.cakes
CREATE POLICY user_access_policy ON public.cakes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Re-create RLS policies for public.cake_recipes
CREATE POLICY user_access_policy ON public.cake_recipes
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
