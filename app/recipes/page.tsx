import { getRecipes } from "../api/recipes/actions";

export default async function Recipes() {
  const recipes = await getRecipes();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Przepisy</h1>
      </section>

      {/*<Content ingredients={ingredients} />*/}
    </main>
  );
}
