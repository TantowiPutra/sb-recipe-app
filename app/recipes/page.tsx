"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Recipe } from "@/types/index";
import { Eye } from "lucide-react";

import RecipeFormContainer from "@/container/RecipeFormContainer";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Recipes() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/recipes?page=${currentPage}`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    if (error) {
      alert("Terjadi Kesalahan Saat Fetching Data Resep [-1]");
    }
  }, [error]);

  return (
    <>
      <div
        className={`fixed inset-0 z-99 flex items-center justify-center bg-black/50 ${
          Loading ? "" : "hidden"
        }`}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>

      <Card className="container flex justify-between flex-row p-6">
        <h1 className="text-center font-bold text-2xl">LIST RECIPES</h1>
        <Button
          onClick={() => {
            setShowCreate(!showCreate);
          }}
        >
          Tambah Resep
        </Button>
      </Card>

      {isLoading ? (
        "Processing..."
      ) : (
        <Card className="mt-5">
          <CardContent>
            {!data?.recipes?.data ? (
              "Data Resep Tidak Ditemukan"
            ) : (
              <Table>
                <TableCaption>List Recipe</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Total Like</TableHead>
                    <TableHead>Total Comment</TableHead>
                    <TableHead>Dibuat Pada</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recipes?.data &&
                    data.recipes.data.map((recipe: Recipe, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{recipe.title}</TableCell>
                        <TableCell>{recipe.likes_count}</TableCell>
                        <TableCell>{recipe.comments_count}</TableCell>
                        <TableCell>{recipe.created_at}</TableCell>
                        <TableCell>{recipe?.user?.name}</TableCell>
                        <TableCell>
                          <Link href={`recipes/${recipe.id}`}>
                            <Eye size={24} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Total Like</TableHead>
                    <TableHead>Total Comment</TableHead>
                    <TableHead>Dibuat Pada</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
          </CardContent>

          <Pagination>
            <PaginationContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => {
                      setCurrentPage(index);
                      mutate();
                    }}
                    className={index == currentPage ? "bg-slate-400" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </Card>
      )}

      <Drawer open={showCreate} onOpenChange={setShowCreate}>
        <DrawerContent>
          <DrawerHeader>
            <RecipeFormContainer
              onFinished={() => {
                setShowCreate(false);
                mutate();
              }}
              setLoading={setLoading}
            />
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}
