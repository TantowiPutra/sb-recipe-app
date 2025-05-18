import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) + 1;

    const cookieStore = await cookies();
    const token = cookieStore.get("loginToken");

    if (!token) {
      return NextResponse.json(
        { message: "Sesi Telah Habis. Coba Login Lagi" },
        { status: 403 }
      );
    }

    const res = await fetch(
      `https://service.pace11.my.id/api/recipe/saves?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Gagal Fetching Data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { message: "Berhasil Fetching Data!", recipes: data },
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
