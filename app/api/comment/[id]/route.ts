import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    console.log(id);

    const cookieStore = await cookies();
    const token = cookieStore.get("loginToken");

    if (!token) {
      return NextResponse.json(
        { message: "Sesi Telah Habis. Coba Login Lagi" },
        { status: 403 }
      );
    }

    const res = await fetch(`https://service.pace11.my.id/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal Delete Comment" },
        { status: res.status }
      );
    }

    const recipe = await res.json();

    return NextResponse.json(
      { message: "Berhasil Delete Comment", data: recipe.data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error => ", error);
    return NextResponse.json(
      { message: "Something Went Wrong!" },
      { status: 500 }
    );
  }
}
