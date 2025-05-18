"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import CommentContainer from "@/container/CommentContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LikeButton } from "@/component/likebutton";
import { SaveButton } from "@/component/savebutton";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Trash } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation"; // <== ini penting

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [Loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Resep berhasil dihapus!");
        router.push("/recipes");
      } else {
        const body = await res.json();
        alert(body.message || "Gagal menghapus resep.");
      }
    } catch (error) {
      console.error("Error deleting resep", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };

    fetchParams();
  }, [params]);

  const { data, isLoading, mutate } = useSWR(
    id ? `/api/recipes/${id}` : null,
    fetcher
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-99 flex items-center justify-center bg-black/50 ${
          Loading ? "" : "hidden"
        }`}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>
      <Link href="/recipes">
        <Button className="mb-3">
          <ArrowBigLeft size={48} />
          Back
        </Button>
      </Link>
      {isLoading ? "Loading..." : ""}
      {data?.data && (
        <Card className="mb-5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-4">
              {data.data.title.toUpperCase()}
              <LikeButton
                defaultLiked={data.data.is_liked_by_me}
                id={data.data.id}
                onLiked={() => {
                  mutate();
                }}
              />

              <SaveButton
                id={data.data.id}
                onSaved={() => {
                  mutate();
                }}
              />

              <Popover>
                <PopoverTrigger>
                  <Button className="bg-red-400">
                    <Trash />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h4 className="font-medium leading-none">Konfirmasi</h4>
                  <div className="text-sm text-muted-foreground">
                    Konfirmasi Delete Resep Ini?
                    <div className="gap-4 mt-3 flex">
                      <Button
                        onClick={() => {
                          setLoading(true);
                          handleDelete();
                        }}
                      >
                        Ya
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2">Tentang Resep</CardTitle>
            <p>{data.data.content}</p>
          </CardContent>
          <CardContent>
            <CardTitle className="mb-2">Total Like</CardTitle>
            <p>{data.data.likes_count}</p>
          </CardContent>
          <CardContent>
            <CardTitle className="mb-2">Dibuat Oleh</CardTitle>
            <p>{data.data.user.name}</p>
          </CardContent>
        </Card>
      )}

      <CommentContainer
        onFinished={() => {
          mutate();
        }}
        setLoading={setLoading}
        id={id || ""}
      />
    </>
  );
}
