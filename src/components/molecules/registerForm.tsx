import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "../atoms/input";
import { toast } from "../../hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Typography } from "../atoms/typography";
import {
  registerSchema,
  RegisterSchema,
} from "../../schemes/user/register.schema";
import { Link } from "react-router";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: RegisterSchema) {
    setLoading(true);

    // 3. Handle your form submission.
    //const confirmedUser = await login(values);

    // 4. Handle the response.
    /* if (confirmedUser) {
     
      / set/update authentication token
      /update

     return router.push("/"); 
    } */

    // 5. Handle the error.
    toast({
      title: "Email ou senha incorretos",
      description: "Problema no servido.",
      variant: "destructive",
    });

    setLoading(false);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full md:w-1/2 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormDescription>
                Esse é seu email registrado conosco.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Esse é a sua senha registrado conosco.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirme a senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>Confirme a senha digitada.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>
        <Typography variant={"small"} className="text-center">
          Já tem uma conta conosco ?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Faça login
          </Link>
        </Typography>
      </form>
    </Form>
  );
};
export default RegisterForm;
