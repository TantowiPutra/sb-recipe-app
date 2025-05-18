import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

export const loginFormSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type loginFormType = z.infer<typeof loginFormSchema>;

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
