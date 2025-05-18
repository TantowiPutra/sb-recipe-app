import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("loginToken");

  if (!token) {
    redirect("/login");
  }

  const res = await fetch(`https://service.pace11.my.id/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    cache: "no-store", // opsional agar tidak cached
  });

  let data;

  if (res.ok) {
    const body = await res.json();
    data = body.data;
  } else {
    data = null;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      {data ? (
        <Card>
          <CardHeader className="flex gap-4 items-center">
            <CardTitle>PROFIL SAYA</CardTitle>
            <Link href={`/profile/update`}>
              <Button>
                <SquarePen size={28} />
              </Button>
            </Link>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama</p>
              <p className="font-medium">{data.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Alamat</p>
              <p className="font-medium">{data.address}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-muted-foreground">
          Gagal memuat data pengguna.
        </p>
      )}
    </div>
  );
}
