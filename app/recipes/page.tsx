import { getRecipes } from "../api/recipes/actions";
import { Content } from "./content";

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Przepisy</h1>
      </section>

      <Content recipes={recipes} />
    </main>
  );
}
