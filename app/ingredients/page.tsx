import connectDB from "@/lib/db";
import { Content } from "./_components/content";
import Ingredient from "@/lib/models/Ingredient";

const getIngredients = async () => {
  try {
    await connectDB();
    const ingredients = await Ingredient.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(ingredients));
  } catch (error) {
    console.error("Database operation error:", error);
    return [];
  }
};

export default async function Ingredients() {
  const initialIngredients = await getIngredients();

  return (
    <main>
      <section className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Składniki</h1>
      </section>

      <Content initialIngredients={initialIngredients} />
    </main>
  );
}
