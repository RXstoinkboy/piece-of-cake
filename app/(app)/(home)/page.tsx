import { getRecipes } from "@/app/(app)/api/recipes/actions";
import { Content } from "./content";
import { getCakes } from "@/app/(app)/api/cakes/actions";

export default async function Home() {
  const recipes = await getRecipes();
  const cakes = await getCakes();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Torty</h1>
      </section>

      <Content recipes={recipes} cakes={cakes} />
    </main>
  );
}
