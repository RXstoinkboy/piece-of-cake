ALTER TABLE public.cake_recipes
DROP CONSTRAINT cake_recipes_pkey;

ALTER TABLE public.cake_recipes
ADD PRIMARY KEY (recipe_id, cake_id, "order");
