"use server";

import { z } from "zod";
import type { FormState } from "@/app/login/page";
import { cookies } from "next/headers";

type FieldErrors = {
  [key: string]: string[];
};

export async function Login(
  prevState: {
    message?: string;
    errors?: object;
    isSuccess?: boolean | null;
  },
  formData: FormData
): Promise<FormState> {
  try {
    const formSchema = z.object({
      email: z.string().min(1, "Email Wajib Diisi!"),
      password: z.string().min(1, "Password Wajib Diisi!"),
    });

    const parse = formSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parse.success) {
      const fieldErrors: FieldErrors = parse.error.formErrors.fieldErrors || {};

      const errors = Object.keys(fieldErrors)?.reduce((acc, key) => {
        acc[key] = fieldErrors[key]?.[0] || "Unknown error";
        return acc;
      }, {} as Record<string, string>);

      return {
        message: "Validasi Gagal!",
        errors: errors,
        isSuccess: false,
      };
    }

    const response = await fetch(
      "https://service.pace11.my.id/api/auth/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: parse.data.email!,
          password: parse.data.password!,
        }),
      }
    );

    if (!response.ok) {
      return {
        message: "Gagal Login! Check Email atau Password Kamu",
        errors: {
          email: "",
          password: "",
        },
        isSuccess: true,
      };
    }

    const body = await response.json();
    const loginToken = body.data.token;

    const cookieStore = await cookies();

    cookieStore.set("loginToken", loginToken, {
      path: "/",
      httpOnly: false,
      secure: true,
      maxAge: 60 * 60 * 60,
    });

    return {
      message: "Berhasil Login!",
      errors: {
        email: "",
        password: "",
      },
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Terjadi Error Pada Server API [-1]",
      errors: {
        email: "",
        password: "",
      },
      isSuccess: false,
    };
  }
}
