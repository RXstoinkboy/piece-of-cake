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
import { Database } from "@/types/supabase";
import { FC } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

type RecipeFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
  ingredients: Database["public"]["Tables"]["ingredients"]["Row"][];
};

export const RecipeForm: FC<RecipeFormProps> = ({ form, ingredients }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
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
                <Input placeholder="np. Masa śmietankowa" {...field} />
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
                <Input placeholder="Dodatkowe informacje" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-display3">
        {fields.map((ingredient, index) => (
          <div key={ingredient.id} className="flex gap-4 items-end mb-4">
            <FormField
              control={form.control}
              name={`ingredients.${index}.ingredient_id`}
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Składnik</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz składnik z listy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ingredients.map((ing) => (
                        <SelectItem key={ing.id} value={ing.id}>
                          {ing.name} ({ing.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Ilość</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="np. 200g"
                      {...field}
                      onChange={({ target }) =>
                        field.onChange(Number(target.value))
                      }
                    />
                  </FormControl>
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
          onClick={() => append({ ingredient_id: "", quantity: 0 })}
          variant="secondary"
          className="w-fit"
        >
          <PlusCircle className="mr-2" />
          Dodaj składnik
        </Button>
      </div>
    </div>
  );
};
