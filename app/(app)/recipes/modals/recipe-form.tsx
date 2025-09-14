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
import { FC, useRef } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
  const ingredientSelectRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
                <Textarea placeholder="Dodatkowe informacje" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-display3 ">
        {fields.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className="grid grid-cols-[1fr_90px_auto] gap-4 items-start mb-4 "
          >
            <FormField
              control={form.control}
              name={`ingredients.${index}.ingredient_id`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produkt</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        ref={(el) => {
                          ingredientSelectRefs.current[index] = el;
                        }}
                      >
                        <SelectValue placeholder="Wybierz produkt z listy" />
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
                <FormItem>
                  <FormLabel>Ilość</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      placeholder="np. 200g"
                      min={0}
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
            <Button
              size="icon"
              onClick={() => remove(index)}
              variant="outline"
              className="mt-[22px]"
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        ))}
        <Button
          onClick={(e) => {
            e.preventDefault();
            append({ ingredient_id: "", quantity: 1 });

            setTimeout(() => {
              const lastIndex = fields.length;
              ingredientSelectRefs.current[lastIndex]?.focus();
            }, 10);
          }}
          variant="secondary"
          className="w-fit justify-self-start"
        >
          <PlusCircle className="mr-2" />
          Dodaj produkt
        </Button>
      </div>
    </div>
  );
};
