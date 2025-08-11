import { Content } from "./_components/content";
import prisma from "@/lib/prisma";

const getIngredients = async () => {
  try {
    return await prisma.ingredient.findMany();
  } catch (error) {
    console.error("Database operation error:", error);
    return [];
  }
};

export default async function Ingredients() {
  const ingredients = await getIngredients();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Składniki</h1>
      </section>

      <Content ingredients={ingredients} />
    </main>
  );
}
