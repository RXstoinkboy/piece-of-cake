import { Recipe } from "./actions";

export const getRecipeIngredients = (
  data: Omit<Recipe, "ingredients_cost" | "ingredients_cost_currency">[],
): Recipe[] => {
  return data.map((recipe) => {
    const ingredients_cost = (recipe.recipe_ingredients ?? []).reduce(
      (acc, { ingredient_id, quantity }) => {
        // Ensure ingredient_id and its properties are not null before calculation
        if (
          !ingredient_id ||
          ingredient_id.price === null ||
          ingredient_id.quantity === null ||
          quantity === null
        ) {
          return acc;
        }
        return acc + quantity * (ingredient_id.price / ingredient_id.quantity);
      },
      0,
    );
    return {
      ...recipe,
      ingredients_cost,
      // TODO: might be recalculated based on ingredient prices and their currency
      ingredients_cost_currency: "PLN",
    };
  });
};
