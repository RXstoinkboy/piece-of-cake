import { HeartHandshake } from "lucide-react";
import { RecipeCard } from "./cake-recipe-card";
import { Empty, EmptyButton } from "@/components/molecules/empty-state";
import { AddCake } from "./modals/add";
import { getRecipes } from "../api/recipes/actions";
import { Content } from "./content";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <section className="flex flex-col items-center justify-center py-14">
        <HeartHandshake size={80} className="stroke-red-700" />
        <h1 className="text-4xl font-bold">Cześć, Kochanie!</h1>
      </section>

      <Content recipes={recipes} />
    </main>
  );
}
