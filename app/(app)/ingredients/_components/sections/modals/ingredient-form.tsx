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
import { UseFormReturn } from "react-hook-form";

type IngredientFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
};

export const IngredientForm: FC<IngredientFormProps> = ({ form }) => {
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
                <Input placeholder="np. Jajka" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ilość</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="np. 1.5"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jednostka</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="np. g" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="g">Gramy</SelectItem>
                  <SelectItem value="kg">Kilogramy</SelectItem>
                  <SelectItem value="l">Litry</SelectItem>
                  <SelectItem value="ml">Mililitry</SelectItem>
                  <SelectItem value="pcs">Sztuki</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input
                  placeholder="np. 1.50"
                  type="number"
                  min={0}
                  step={0.01}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid gap-3">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waluta</FormLabel>
              <FormControl>
                <Input placeholder="np. PLN" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
