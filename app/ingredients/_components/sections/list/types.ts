export type Ingredient = {
    _id: string;
    name: string;
    price: number;
    currency: "PLN";
    amount: number;
    unit: "g" | "ml" | "szt" | "kg" | "l";
    description: string;
  };