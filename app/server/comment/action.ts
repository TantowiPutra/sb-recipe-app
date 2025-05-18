"use server";

import { z } from "zod";
import type { FormState } from "@/container/CommentContainer/index";
import { cookies } from "next/headers";

type FieldErrors = {
  [key: string]: string[];
};

export async function AddComment(
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
          "Gagal Add Comment! Token Expired! Silahkan Refresh dan Login Lagi!",
        errors: {
          id: "",
          comment: "",
        },
        isSuccess: false,
      };
    }

    const formSchema = z.object({
      id: z.string().min(1, "ID Wajib Diisi!"),
      comment: z.string().min(1, "Comment Wajib Diisi!"),
    });

    const parse = formSchema.safeParse({
      id: formData.get("id"),
      comment: formData.get("comment"),
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
      `https://service.pace11.my.id/api/comment/recipe/${parse.data.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          content: parse.data.comment!,
        }),
      }
    );

    if (!response.ok) {
      return {
        message: "Gagal Submit Comment!",
        errors: {
          id: "",
          comment: "",
        },
        isSuccess: false,
      };
    }

    return {
      message: "Berhasil Submit Comment!",
      errors: {
        id: "",
        comment: "",
      },
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Terjadi Error Pada Server API [-1]",
      errors: {
        id: "",
        comment: "",
      },
      isSuccess: false,
    };
  }
}
