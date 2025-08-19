CREATE TABLE public.cakes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE POLICY "Authenticated users can view cakes."
  ON public.cakes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert cakes."
  ON public.cakes FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update cakes."
  ON public.cakes FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete cakes."
  ON public.cakes FOR DELETE
  USING (auth.role() = 'authenticated');

  CREATE TABLE public.cake_recipes (
      recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
      cake_id UUID REFERENCES public.cakes(id) ON DELETE CASCADE,
      PRIMARY KEY (recipe_id, cake_id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  CREATE POLICY "Authenticated users can view cake component."
    ON public.cake_recipes FOR SELECT
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can insert cake component."
    ON public.cake_recipes FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can update cake component."
    ON public.cake_recipes FOR UPDATE
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can delete cake component."
    ON public.cake_recipes FOR DELETE
    USING (auth.role() = 'authenticated');
