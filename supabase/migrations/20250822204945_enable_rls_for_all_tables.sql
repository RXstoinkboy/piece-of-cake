ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cake_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for anon users" ON public.recipe_ingredients
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all for anon users" ON public.cakes
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all for anon users" ON public.cake_recipes
FOR ALL
TO anon
USING (true)
WITH CHECK (true);
