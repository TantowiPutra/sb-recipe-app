import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

export const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export const recipeFormSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1),
  title: z.string().min(1),
});

export const commentFormSchema = z.object({
  id: z.string().min(1),
  comment: z.string().min(1),
});

export const updateProfileFormSchema = z.object({
  address: z.string().min(1),
  email: z.string().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
});

export type loginFormType = z.infer<typeof loginFormSchema>;
export type recipeFormType = z.infer<typeof recipeFormSchema>;
export type commentFormType = z.infer<typeof commentFormSchema>;
export type updateProfileType = z.infer<typeof updateProfileFormSchema>;

export default function useFormActionLogin({
  values,
}: {
  values?: loginFormType;
}) {
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      form.reset(values);
    }
  }, [values, form]);

  return { form };
}
export function useFormActionRecipe({ values }: { values?: recipeFormType }) {
  const form = useForm<recipeFormType>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      id: "",
      content: "",
      title: "",
    },
  });

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      form.reset(values);
    }
  }, [values, form]);

  return { form };
}
export function useFormActionComment({ values }: { values?: commentFormType }) {
  const form = useForm<commentFormType>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      id: "",
      comment: "",
    },
  });

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      form.reset(values);
    }
  }, [values, form]);

  return { form };
}

export function useFormActionUpdateProfile({
  values,
}: {
  values?: updateProfileType;
}) {
  const form = useForm<updateProfileType>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      address: "",
      email: "",
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (values && Object.keys(values).length > 0) {
      form.reset(values);
    }
  }, [values, form]);

  return { form };
}
