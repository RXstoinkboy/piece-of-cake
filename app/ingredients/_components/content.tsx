import Ingredient from "@/lib/models/Ingredient";
import { Empty } from "../../../components/molecules/empty-state";
import { List } from "./sections/_list";
import connectDB from "@/lib/db";

const getIngredients = async () => {
  try {
    await connectDB();
    const ingredients = await Ingredient.find({}).sort({ createdAt: -1 });
    return ingredients;
  } catch (error) {
    console.error("Database operation error:", error);
    throw new Error("Failed to fetch ingredients");
  }
};

export const Content = async () => {
  const ingredients = await getIngredients();

  if (!ingredients.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Empty
          title="Brak składników"
          text="Dodaj pierwszy składnik, aby rozpocząć pracę."
          buttonText="Dodaj składnik"
        />
      </div>
    );
  }

  return <List ingredients={ingredients} />;
};
