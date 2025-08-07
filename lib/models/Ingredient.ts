import mongoose, { Document, Schema } from "mongoose";

export interface IIngredient extends Document {
  name: string;
  description?: string;  // Add this missing field
  unit: string;
  amount: number;
  price: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const IngredientSchema = new Schema<IIngredient>(
  {
    name: {
      type: String,
      required: [true, "Ingredient name is required"],
      trim: true,
      maxlength: [100, "Ingredient name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    unit: {
      type: String,
      required: [true, "Unit is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

IngredientSchema.index({ name: 1 });

const Ingredient = mongoose.models.Ingredient || mongoose.model<IIngredient>("Ingredient", IngredientSchema);

export default Ingredient;