"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Hamburger } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import useFormActionLogin from "@/hooks/useFormAction";
import { Login } from "../server/login/action";

export type FormState = {
  message?: string;
  errors?: {
    email?: string;
    password?: string;
  };
  isSuccess?: boolean | null;
};

export const initialState: FormState = {
  message: "",
  errors: {
    email: "",
    password: "",
  },
  isSuccess: null,
};

export default function Register() {
  const { form } = useFormActionLogin({});
  const [Loading, setLoading] = useState<boolean>(false);

  const [state, formAction] = useActionState<FormState, FormData>(
    Login,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }

    setLoading(false);
  }, [state]);

  return (
    <Card className="max-w-lg mx-auto mt-10 w-[50vw]">
      <div
        className={`fixed inset-0 z-99 flex items-center justify-center bg-black/50 ${
          Loading ? "" : "hidden"
        }`}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>

      <CardContent>
        <Form {...form}>
          <div>
            <Hamburger size={100} className="block mx-auto" />
            <form
              className="space-y-6"
              action={formAction}
              onSubmit={() => {
                setLoading(true);
              }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EMAIL</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>Masukan Email</FormDescription>
                    <FormMessage />
                    {state?.errors && typeof state.errors === "object" && (
                      <small className="text-red-500">
                        {state?.errors?.email}
                      </small>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PASSWORD</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Masukkan password</FormDescription>
                    <FormMessage />
                    {state?.errors && typeof state.errors === "object" && (
                      <small className="text-red-500">
                        {state?.errors?.password}
                      </small>
                    )}
                  </FormItem>
                )}
              />

              <Button type="submit">Login</Button>
            </form>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
