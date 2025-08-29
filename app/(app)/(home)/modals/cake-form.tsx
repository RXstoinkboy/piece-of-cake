import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Recipe } from "@/app/(app)/api/recipes/actions";
import { Textarea } from "@/components/ui/textarea";

type CakeFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
  recipes: Recipe[];
};

export const CakeForm: FC<CakeFormProps> = ({ form, recipes }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipes",
  });

  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="np. Psiakowa 7" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notatki</FormLabel>
              <FormControl>
                <Textarea placeholder="Dodatkowe informacje" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-display3">
        <FormLabel className="mb-2">Składniki</FormLabel>
        {fields.map((recipeId, index) => (
          <div
            key={`${recipeId.id}-${index}`}
            className="grid grid-cols-[1fr_auto] gap-4 items-end mb-1"
          >
            <FormField
              control={form.control}
              name={`recipes.${index}`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) =>
                      field.onChange({ recipe_id: value, order: index })
                    }
                    defaultValue={field.value.recipe_id}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Wybierz składnik z listy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {recipes.map((recipe) => (
                        <SelectItem key={recipe.id} value={recipe.id}>
                          {recipe.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="icon" onClick={() => remove(index)} variant="outline">
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          onClick={(e) => {
            e.preventDefault();
            append({ recipe_id: "", order: recipes.length });
          }}
          variant="secondary"
          className="w-fit mt-2"
        >
          <PlusCircle className="mr-2" />
          Dodaj składnik
        </Button>
      </div>
    </div>
  );
};
