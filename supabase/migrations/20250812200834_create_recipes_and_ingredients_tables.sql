CREATE TABLE public.recipes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.ingredients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    price REAL NOT NULL,
    currency TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    recipe_id uuid REFERENCES public.recipes(id)
);

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for anon users" ON public.recipes
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all for anon users" ON public.ingredients
FOR ALL
TO anon
USING (true)
WITH CHECK (true);
