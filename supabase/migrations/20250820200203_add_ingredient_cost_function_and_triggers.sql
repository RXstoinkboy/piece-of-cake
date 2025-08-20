-- Function to calculate ingredients_cost for a given recipe
CREATE OR REPLACE FUNCTION calculate_recipe_ingredients_cost(recipe_id_param UUID)
RETURNS NUMERIC AS $$
DECLARE
    total_cost NUMERIC := 0;
BEGIN
    SELECT COALESCE(SUM(ri.quantity * (i.price / i.quantity)), 0)
    INTO total_cost
    FROM recipe_ingredients ri
    JOIN ingredients i ON ri.ingredient_id = i.id
    WHERE ri.recipe_id = recipe_id_param
    AND i.price IS NOT NULL
    AND i.quantity IS NOT NULL
    AND ri.quantity IS NOT NULL;

    RETURN total_cost;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for changes in recipe_ingredients (INSERT, UPDATE, DELETE)
-- This updates the cost for a single recipe affected by a change in its ingredients list.
CREATE OR REPLACE FUNCTION handle_recipe_ingredient_changes()
RETURNS TRIGGER AS $$
DECLARE
    rec_id UUID;
BEGIN
    IF TG_OP = 'DELETE' THEN
        rec_id := OLD.recipe_id;
    ELSE
        rec_id := NEW.recipe_id;
    END IF;

    UPDATE recipes
    SET ingredients_cost = calculate_recipe_ingredients_cost(rec_id)
    WHERE id = rec_id;

    RETURN NULL; -- Triggers always return NULL for AFTER triggers
END;
$$ LANGUAGE plpgsql;

-- Trigger function for changes in ingredients (price or quantity update)
-- This updates the cost for ALL recipes that use the changed ingredient.
CREATE OR REPLACE FUNCTION handle_ingredient_price_quantity_changes()
RETURNS TRIGGER AS $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT DISTINCT recipe_id
             FROM recipe_ingredients
             WHERE ingredient_id = NEW.id LOOP
        UPDATE recipes
        SET ingredients_cost = calculate_recipe_ingredients_cost(r.recipe_id)
        WHERE id = r.recipe_id;
    END LOOP;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger on recipe_ingredients for INSERT, UPDATE, DELETE
-- Recalculates recipe cost when a recipe's ingredient list changes.
CREATE TRIGGER trg_recipe_ingredients_cost_update
AFTER INSERT OR UPDATE OR DELETE ON recipe_ingredients
FOR EACH ROW
EXECUTE FUNCTION handle_recipe_ingredient_changes();

-- Trigger on ingredients for UPDATE (specifically when price or quantity changes)
-- Recalculates costs for all recipes that use the updated ingredient.
CREATE TRIGGER trg_ingredients_cost_update
AFTER UPDATE OF price, quantity ON ingredients
FOR EACH ROW
WHEN (OLD.price IS DISTINCT FROM NEW.price OR OLD.quantity IS DISTINCT FROM NEW.quantity)
EXECUTE FUNCTION handle_ingredient_price_quantity_changes();

-- Initial backfill: Update existing recipes' ingredients_cost
-- This block ensures that all existing recipes have their ingredients_cost
-- calculated correctly when this migration is applied.
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT id FROM recipes LOOP
        UPDATE recipes
        SET ingredients_cost = calculate_recipe_ingredients_cost(r.id)
        WHERE id = r.id;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
