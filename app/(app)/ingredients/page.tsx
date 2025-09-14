import { Content } from "./_components/content";
import { getIngredients } from "@/app/(app)/api/ingredients/actions";

export default async function Ingredients() {
  const ingredients = await getIngredients();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Produkty</h1>
      </section>

      <Content ingredients={ingredients} />
    </main>
  );
}
