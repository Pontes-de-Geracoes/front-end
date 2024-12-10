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
import { loginSchema, LoginSchema } from "../../schemes/user/login.scheme";
import { Typography } from "../atoms/typography";
import Anchor from "../atoms/anchor";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "sadfsdfsadf@gmail.com",
      password: "vitor66X",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: LoginSchema) {
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

        <Button type="submit" className="w-full">
          {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
        </Button>
        <Typography variant={"small"} className="text-center">
          Não tem uma conta ainda ?{" "}
          <Anchor
            href="/register"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Crie uma agora
          </Anchor>
        </Typography>
      </form>
    </Form>
  );
};
export default LoginForm;
