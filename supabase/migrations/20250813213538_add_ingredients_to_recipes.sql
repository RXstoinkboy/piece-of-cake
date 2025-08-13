-- This migration file sets up a many-to-many relationship between recipes and ingredients
-- using a junction table called 'recipe_ingredients'.

CREATE TABLE public.recipe_ingredients (
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES public.ingredients(id) ON DELETE CASCADE,
    quantity NUMERIC,
    unit TEXT,
    notes TEXT,
    PRIMARY KEY (recipe_id, ingredient_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE POLICY "Authenticated users can view recipe ingredients."
  ON public.recipe_ingredients FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert recipe ingredients."
  ON public.recipe_ingredients FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update recipe ingredients."
  ON public.recipe_ingredients FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete recipe ingredients."
  ON public.recipe_ingredients FOR DELETE
  USING (auth.role() = 'authenticated');
