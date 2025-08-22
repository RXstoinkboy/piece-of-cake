alter table "public"."cake_recipes" drop constraint "cake_recipes_pkey";

drop index if exists "public"."cake_recipes_pkey";

alter table "public"."cake_recipes" alter column "order" set data type integer using "order"::integer;

CREATE UNIQUE INDEX cake_recipes_pkey ON public.cake_recipes USING btree (recipe_id, cake_id);

alter table "public"."cake_recipes" add constraint "cake_recipes_pkey" PRIMARY KEY using index "cake_recipes_pkey";


