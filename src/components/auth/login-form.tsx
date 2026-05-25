"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { loginUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

import { ROUTES } from "@/constants/routes";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<
  typeof loginSchema
>;

export default function LoginForm() {

  const router = useRouter();

  const { setAuth } =
    useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver:
      zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    values: LoginFormValues
  ) => {

    try {

      const response =
        await loginUser(values);

      console.log(response);

      // IMPORTANT FIX
      const token =
        response.data.token;

      const role =
        response.data.role;

      // Save in Zustand
      setAuth(token, role);

      // Save in localStorage
      localStorage.setItem(
        "token",
        token
      );

      toast.success(
        "Login successful"
      );

      if (role === "ADMIN") {

        router.push(
          ROUTES.ADMIN_DASHBOARD
        );

      } else if (
        role === "RESTAURANT_OWNER"
      ) {

        router.push(
          ROUTES.RESTAURANT_DASHBOARD
        );

      } else {

        router.push(
          ROUTES.CUSTOMER_DASHBOARD
        );
      }

    } catch (error: any) {

      toast.error(
        error?.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  return (

    <div
      className="
        w-full
        max-w-md
        space-y-6
        rounded-2xl
        border
        bg-card
        p-8
        shadow-lg
      "
    >

      <div className="
        space-y-2
        text-center
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Welcome Back
        </h1>

        <p className="
          text-muted-foreground
        ">
          Login to your account
        </p>

      </div>

      <Form {...form}>

        <form
          onSubmit={form.handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Email
                </FormLabel>

                <FormControl>

                  <Input
                    placeholder="Enter email"
                    {...field}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Password
                </FormLabel>

                <FormControl>

                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>

        </form>

      </Form>

    </div>
  );
}