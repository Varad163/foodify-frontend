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

import { signupUser } from "@/services/auth.service";

import { ROUTES } from "@/constants/routes";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name too short"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password too short"),
});

type SignupFormValues = z.infer<
  typeof signupSchema
>;

export default function SignupForm() {
  const router = useRouter();

  const form =
    useForm<SignupFormValues>({
      resolver:
        zodResolver(signupSchema),

      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });

  const onSubmit = async (
    values: SignupFormValues
  ) => {
    try {
      await signupUser(values);

      toast.success(
        "Account created successfully"
      );

      router.push(ROUTES.LOGIN);
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ||
          "Signup failed"
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
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="text-muted-foreground">
          Signup to continue
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
            Signup
          </Button>
        </form>
      </Form>
    </div>
  );
}