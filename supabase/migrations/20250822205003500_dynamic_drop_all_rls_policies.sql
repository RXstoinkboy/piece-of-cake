DO $$
DECLARE
    r RECORD;
    policy_name TEXT;
    table_name TEXT;
    schema_name TEXT;
BEGIN
    FOR r IN
        SELECT
            polname AS policy_name,
            relname AS table_name,
            nspname AS schema_name
        FROM
            pg_policy p
        JOIN
            pg_class c ON p.polrelid = c.oid
        JOIN
            pg_namespace n ON c.relnamespace = n.oid
        WHERE
            n.nspname = 'public' AND c.relname IN ('recipes', 'ingredients', 'recipe_ingredients', 'cakes', 'cake_recipes')
    LOOP
        policy_name := r.policy_name;
        table_name := r.table_name;
        schema_name := r.schema_name;

        RAISE NOTICE 'Dropping policy: % on table: %.%', policy_name, schema_name, table_name;
        EXECUTE FORMAT('DROP POLICY IF EXISTS %I ON %I.%I;', policy_name, schema_name, table_name);
    END LOOP;
END
$$ LANGUAGE plpgsql;
