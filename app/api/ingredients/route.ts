import { NextRequest, NextResponse } from "next/server";
import Ingredient from "@/lib/models/Ingredient";
import connectDB from "@/lib/db";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const ingredients = await Ingredient.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ 
      message: "Ingredients fetched successfully!",
      data: ingredients,
      count: ingredients.length
    }, { status: 200 });
  } catch (error) {
    console.error("Database operation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const body = await request.json();
    
    const ingredient = new Ingredient(body);
    await ingredient.save();
    
    return NextResponse.json(
      { 
        message: "Ingredient created successfully!",
        data: ingredient 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database operation error:", error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 }
    );
  }
};