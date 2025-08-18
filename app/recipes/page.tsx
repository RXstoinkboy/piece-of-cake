import { getIngredients } from "../api/ingredients/actions";
import { getRecipes } from "../api/recipes/actions";
import { Content } from "./content";

export default async function Recipes() {
  const recipes = await getRecipes();
  const ingredients = await getIngredients();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Przepisy</h1>
      </section>

      <Content recipes={recipes} ingredients={ingredients} />
    </main>
  );
}
