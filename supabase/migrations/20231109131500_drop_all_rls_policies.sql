-- Drop all existing RLS policies from relevant tables

-- Drop policies with the specific name "Enable all for anon users"
DROP POLICY IF EXISTS "Enable all for anon users" ON public.recipes;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.ingredients;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.recipe_ingredients;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.cakes;
DROP POLICY IF EXISTS "Enable all for anon users" ON public.cake_recipes;

-- Drop policies named "user_access_policy" (from previous attempts)
DROP POLICY IF EXISTS user_access_policy ON public.recipes;
DROP POLICY IF EXISTS user_access_policy ON public.ingredients;
DROP POLICY IF EXISTS user_access_policy ON public.recipe_ingredients;
DROP POLICY IF EXISTS user_access_policy ON public.cakes;
DROP POLICY IF EXISTS user_access_policy ON public.cake_recipes;

-- Drop refined policies (from the most recent attempt)
DROP POLICY IF EXISTS select_own_recipes ON public.recipes;
DROP POLICY IF EXISTS insert_own_recipes ON public.recipes;
DROP POLICY IF EXISTS update_delete_own_recipes ON public.recipes;

DROP POLICY IF EXISTS select_own_ingredients ON public.ingredients;
DROP POLICY IF EXISTS insert_own_ingredients ON public.ingredients;
DROP POLICY IF EXISTS update_delete_own_ingredients ON public.ingredients;

DROP POLICY IF EXISTS select_own_recipe_ingredients ON public.recipe_ingredients;
DROP POLICY IF EXISTS insert_own_recipe_ingredients ON public.recipe_ingredients;
DROP POLICY IF EXISTS update_delete_own_recipe_ingredients ON public.recipe_ingredients;

DROP POLICY IF EXISTS select_own_cakes ON public.cakes;
DROP POLICY IF EXISTS insert_own_cakes ON public.cakes;
DROP POLICY IF EXISTS update_delete_own_cakes ON public.cakes;

DROP POLICY IF EXISTS select_own_cake_recipes ON public.cake_recipes;
DROP POLICY IF EXISTS insert_own_cake_recipes ON public.cake_recipes;
DROP POLICY IF EXISTS update_delete_own_cake_recipes ON public.cake_recipes;
