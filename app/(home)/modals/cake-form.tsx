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
import { Recipe } from "@/app/api/recipes/actions";

type CakeFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
  recipes: Recipe[];
};

export const CakeForm: FC<CakeFormProps> = ({ form, recipes }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "recipeIds",
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
                <Input placeholder="Dodatkowe informacje" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-display3">
        {fields.map((recipeId, index) => (
          <div key={recipeId.id} className="flex gap-4 items-end mb-4">
            <FormField
              control={form.control}
              name={`components.${index}`}
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
          onClick={() => append(" ")}
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
