"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import CommentContainer from "@/container/CommentContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LikeButton } from "@/component/likebutton";
import { SaveButton } from "@/component/savebutton";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const [Loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

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
