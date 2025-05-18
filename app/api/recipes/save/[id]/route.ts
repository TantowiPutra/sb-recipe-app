import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("loginToken");

    if (!token) {
      return NextResponse.json(
        { message: "Sesi Telah Habis. Coba Login Lagi" },
        { status: 403 }
      );
    }

    const res = await fetch(
      `https://service.pace11.my.id/api/recipe/save/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal Save Resep!" },
        { status: res.status }
      );
    }

    const recipe = await res.json();

    return NextResponse.json(
      { message: "Berhasil Save Resep!", data: recipe.data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error =>", error);
    return NextResponse.json(
      { message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
