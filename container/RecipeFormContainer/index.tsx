"use client";

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

import { useEffect } from "react";
import { useActionState } from "react";
import { useFormActionRecipe } from "@/hooks/useFormAction";
import { AddRecipe } from "@/app/server/recipe/action";

export type FormState = {
  message?: string;
  errors?: {
    id?: string;
    title?: string;
    content?: string;
  };
  isSuccess?: boolean | null;
};

export const initialState: FormState = {
  message: "",
  errors: {
    id: "",
    title: "",
    content: "",
  },
  isSuccess: null,
};

export default function RecipeFormContainer({
  setLoading,
  onFinished,
}: {
  setLoading: (val: boolean) => void;
  onFinished: () => void;
}) {
  const { form } = useFormActionRecipe({});

  const [state, formAction] = useActionState<FormState, FormData>(
    AddRecipe,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }

    if (state.isSuccess) {
      onFinished();
    }

    setLoading(false);
  }, [state]);

  return (
    <>
      <Form {...form}>
        <div className="container mx-auto">
          <form
            className="space-y-6"
            action={formAction}
            onSubmit={() => {
              setLoading(true);
            }}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TITLE</FormLabel>
                  <FormControl>
                    <Input placeholder="Cupang Saus Padang" {...field} />
                  </FormControl>
                  <FormDescription>Masukan Title</FormDescription>
                  <FormMessage />
                  {state?.errors && typeof state.errors === "object" && (
                    <small className="text-red-500">
                      {state?.errors?.title}
                    </small>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CONTENT</FormLabel>
                  <FormControl>
                    <textarea
                      {...field} // Use field methods for input binding
                      value={field.value || ""} // Ensure the value is always a string (not null or undefined)
                      placeholder="Masukkan Content"
                      rows={5} // You can adjust the number of rows as needed
                      className="border p-2 w-full rounded-md"
                    />
                  </FormControl>

                  <FormDescription>Masukkan Content</FormDescription>
                  <FormMessage />
                  {state?.errors && typeof state.errors === "object" && (
                    <small className="text-red-500">
                      {state?.errors?.content}
                    </small>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </div>
      </Form>
    </>
  );
}
