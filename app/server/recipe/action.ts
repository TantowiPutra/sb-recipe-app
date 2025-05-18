"use server";

import { z } from "zod";
import type { FormState } from "@/container/RecipeFormContainer/index";
import { cookies } from "next/headers";

type FieldErrors = {
  [key: string]: string[];
};

export async function AddRecipe(
  prevState: {
    message?: string;
    errors?: object;
    isSuccess?: boolean | null;
  },
  formData: FormData
): Promise<FormState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("loginToken");

    if (!token) {
      return {
        message:
          "Gagal Add Resep! Token Expired! Silahkan Refresh dan Login Lagi!",
        errors: {
          id: "",
          title: "",
          content: "",
        },
        isSuccess: false,
      };
    }

    const formSchema = z.object({
      id: z.string().optional(),
      title: z.string().min(1, "Title Wajib Diisi!"),
      content: z.string().min(1, "Content Wajib Diisi!"),
    });

    const parse = formSchema.safeParse({
      id: formData.get("id") || "",
      title: formData.get("title"),
      content: formData.get("content"),
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

    const response = await fetch("https://service.pace11.my.id/api/recipe", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        title: parse.data.title!,
        content: parse.data.content!,
      }),
    });

    if (!response.ok) {
      return {
        message: "Gagal Add Resep! Check Kesesuaian Data!",
        errors: {
          id: "",
          title: "",
          content: "",
        },
        isSuccess: true,
      };
    }

    return {
      message: "Berhasil Menambahkan Resep Baru!",
      errors: {
        id: "",
        title: "",
        content: "",
      },
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Terjadi Error Pada Server API [-1]",
      errors: {
        id: "",
        title: "",
        content: "",
      },
      isSuccess: false,
    };
  }
}
