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
import { useContext, useState } from "react";
import { loginSchema, LoginSchema } from "../../schemes/user/login.scheme";
import { Typography } from "../atoms/typography";
import { Link } from "react-router";
import { login } from "../../services/auth/login.service";
import { UserContext, UserContextSchema } from "../../contexts/user.context";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, update } = useContext(
    UserContext
  ) as UserContextSchema;

  // 1. Define your form.
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "maria@email.com",
      password: "password123",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginSchema) {
    setLoading(true);

    const isLogged = await login(values);

    if (isLogged) {
      toast({
        title: "Encontro confirmado",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(isLogged, null, 2)}
            </code>
          </pre>
        ),
      });

      setIsAuthenticated(true);
      update(isLogged);
      return (window.location.href = "/");
    } else {
      toast({
        title: "Erro",
        description: "Usuário ou senha inválidos",
        variant: "destructive",
      });
    }

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
          <Link
            to="/register"
            className="text-primary hover:underline hover:underline-offset-4"
          >
            Crie uma agora
          </Link>
        </Typography>
      </form>
    </Form>
  );
};
export default LoginForm;
