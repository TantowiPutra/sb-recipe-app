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

import { Button } from "@/components/ui/button";

import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";

import { SavedRecipe } from "@/types/index";
import { ArrowBigLeft, Eye } from "lucide-react";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
export default function SavedRecipes() {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/recipes/saved?page=${currentPage}`,
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
          isLoading ? "" : "hidden"
        }`}
      >
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin" />
      </div>

      <Card className="container flex justify-between flex-row p-6">
        <h1 className="text-center font-bold text-2xl">LIST SAVED RECIPES</h1>
        <div className="btn-container flex gap-4">
          <Link href="/recipes">
            <Button>
              <ArrowBigLeft size={48} /> Back
            </Button>
          </Link>
        </div>
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
                    <TableHead>Dibuat Pada</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recipes?.data &&
                    data.recipes.data.map(
                      (recipe: SavedRecipe, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{recipe.recipe.title}</TableCell>
                            <TableCell>{recipe.recipe.created_at}</TableCell>
                            <TableCell>{recipe.recipe.user.name}</TableCell>
                            <TableCell>
                              <Link href={`/recipes/${recipe.recipe.id}`}>
                                <Eye size={24} />
                              </Link>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
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
    </>
  );
}
