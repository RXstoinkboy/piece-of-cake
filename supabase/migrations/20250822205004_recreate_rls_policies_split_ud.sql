-- Re-create RLS policies for all tables, splitting UPDATE and DELETE operations

-- Policies for public.recipes
CREATE POLICY select_own_recipes ON public.recipes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY insert_own_recipes ON public.recipes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_recipes ON public.recipes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_recipes ON public.recipes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Policies for public.ingredients
CREATE POLICY select_own_ingredients ON public.ingredients
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY insert_own_ingredients ON public.ingredients
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_ingredients ON public.ingredients
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_ingredients ON public.ingredients
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Policies for public.recipe_ingredients
CREATE POLICY select_own_recipe_ingredients ON public.recipe_ingredients
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY insert_own_recipe_ingredients ON public.recipe_ingredients
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_recipe_ingredients ON public.recipe_ingredients
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_recipe_ingredients ON public.recipe_ingredients
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Policies for public.cakes
CREATE POLICY select_own_cakes ON public.cakes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY insert_own_cakes ON public.cakes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_cakes ON public.cakes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_cakes ON public.cakes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Policies for public.cake_recipes
CREATE POLICY select_own_cake_recipes ON public.cake_recipes
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY insert_own_cake_recipes ON public.cake_recipes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY update_own_cake_recipes ON public.cake_recipes
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY delete_own_cake_recipes ON public.cake_recipes
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
