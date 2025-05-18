import { Card, CardHeader, CardContent } from "@/components/ui/card";
import useSWR from "swr";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { useFormActionComment } from "@/hooks/useFormAction";
import { AddComment } from "@/app/server/comment/action";
import { Trash } from "lucide-react";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  };
};

export type FormState = {
  message?: string;
  errors?: {
    id?: string;
    comment?: string;
  };
  isSuccess?: boolean | null;
};

export const initialState: FormState = {
  message: "",
  errors: {
    id: "",
    comment: "",
  },
  isSuccess: null,
};

export default function CommentContainer({
  id,
  onFinished,
  setLoading,
}: {
  id: string;
  onFinished(): void;
  setLoading(val: boolean): void;
}) {
  const { form } = useFormActionComment({});
  const [commentId, setCommentId] = useState<string>("");

  const [state, formAction] = useActionState<FormState, FormData>(
    AddComment,
    initialState
  );

  const { data, isLoading, mutate } = useSWR<{ data: Comment[] }>(
    id ? `/api/recipes/comments/${id}` : null,
    fetcher
  );

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/${commentId}`, {
        method: "DELETE",
      });

      const body = await res.json();
      alert(body.message);

      mutate();
      onFinished();
    } catch (error) {
      console.error("Error deleting comment", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }

    if (state.isSuccess) {
      form.reset();
      mutate();
      onFinished();
    }

    setLoading(false);
  }, [state]);

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <Card className="space-y-4 px-4">
      {data?.data
        ? data?.data.map((comment, index) => (
            <div key={index}>
              <div className="shadow-md rounded p-5 relative" key={comment.id}>
                <div className="comment-wrapper">
                  <CardHeader>
                    <p className="font-medium">{comment.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.content}</p>
                  </CardContent>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="bg-red-400 absolute top-[50%] right-[2%] translate-y-[-50%]"
                      onClick={() => {
                        setCommentId(comment.id);
                      }}
                    >
                      <Trash size={48} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Konfirmasi</h4>
                        <div className="text-sm text-muted-foreground">
                          Konfirmasi Delete Comment Ini?
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
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))
        : "Belum Ada Komentar"}

      <hr />

      <Form {...form}>
        <div className="container mx-auto">
          <form
            className="space-y-6"
            action={formAction}
            onSubmit={() => {
              setLoading(true);
            }}
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="...."
                      {...field}
                      type="hidden"
                      value={id || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>COMMENT</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      value={field.value || ""}
                      placeholder="Masukkan Comment"
                      rows={5}
                      className="border p-2 w-full rounded-md"
                    />
                  </FormControl>

                  <FormMessage />
                  {state?.errors && typeof state.errors === "object" && (
                    <small className="text-red-500">
                      {state?.errors?.comment}
                    </small>
                  )}
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Form>
    </Card>
  );
}
