import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ingredient } from "@/app/ingredients/_components/sections/_list/types";

export const ingredientsKeys = {
  all: ['ingredients'] as const,
  lists: () => [...ingredientsKeys.all, 'list'] as const,
  list: (filters: string) => [...ingredientsKeys.lists(), { filters }] as const,
  details: () => [...ingredientsKeys.all, 'detail'] as const,
  detail: (id: string) => [...ingredientsKeys.details(), id] as const,
};

async function fetchIngredients(): Promise<Ingredient[]> {
  const response = await fetch("/api/ingredients");
  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }
  const data = await response.json();
  return data.data || [];
}

async function addIngredient(newIngredient: Partial<Ingredient>): Promise<Ingredient> {
  const response = await fetch("/api/ingredients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Nowy składnik",
      description: "",
      unit: "szt",
      amount: 0,
      price: 0,
      currency: "PLN",
      ...newIngredient,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add ingredient");
  }

  const data = await response.json();
  return data.data;
}

export function useIngredients(initialData?: Ingredient[]) {
  return useQuery({
    queryKey: ingredientsKeys.lists(),
    queryFn: fetchIngredients,
    initialData,
    staleTime: 30 * 1000,
  });
}

export function useAddIngredient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addIngredient,
    onMutate: async (newIngredient) => {
      await queryClient.cancelQueries({ queryKey: ingredientsKeys.lists() });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>(ingredientsKeys.lists());

      const optimisticIngredient: Ingredient = {
        _id: `temp-${Date.now()}`,
        name: "Nowy składnik",
        description: "",
        unit: "szt",
        amount: 0,
        price: 0,
        currency: "PLN",
        ...newIngredient,
      };

      queryClient.setQueryData<Ingredient[]>(
        ingredientsKeys.lists(),
        (old) => old ? [optimisticIngredient, ...old] : [optimisticIngredient]
      );

      return { previousIngredients, optimisticIngredient };
    },
    onError: (err, newIngredient, context) => {
      if (context?.previousIngredients) {
        queryClient.setQueryData(ingredientsKeys.lists(), context.previousIngredients);
      }
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Ingredient[]>(
        ingredientsKeys.lists(),
        (old) => {
          if (!old || !context?.optimisticIngredient) return old;
          return old.map(ingredient => 
            ingredient._id === context.optimisticIngredient._id ? data : ingredient
          );
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ingredientsKeys.lists() });
    },
  });
}