"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { login, register } from "@/app/(app)/api/auth/actions";

const FormSchema = z.object({
  email: z.string().min(1, "Email jest wymagany"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

type LoginFormProps = {
  mode: "login" | "register";
} & React.ComponentProps<"div">;

export function LoginForm({ mode, ...props }: LoginFormProps) {
  const isRegister = mode === "register";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isRegister) {
      try {
        await register(data);
        toast.success(
          "Udało się! Przejdź do swojej skrzynki pocztowej i potwierdź rejestrację.",
        );
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    } else {
      try {
        await login(data);
        toast.success("Zalogowano pomyślnie!");
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    }
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          {isRegister ? (
            <>
              <CardTitle>Zarejestruj się!</CardTitle>
              <CardDescription>
                Podaj email i hasło, aby się zarejestrować.
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Zaloguj się!</CardTitle>
              <CardDescription>
                Podaj swoje email i hasło, aby zalogować się do swojego konta.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hasło</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {isRegister ? "Zarejestruj się" : "Zaloguj się"}
                </Button>
                {/*<Button variant="outline" className="w-full">
                  Login with Google
                </Button>*/}
              </div>
            </div>
            {isRegister ? (
              <div className="mt-4 text-center text-sm">
                Masz już konto?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Zaloguj się
                </Link>
              </div>
            ) : (
              <div className="mt-4 text-center text-sm">
                Nie masz konta?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Zarejestruj się
                </Link>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
