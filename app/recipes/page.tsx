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

import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Recipe } from "@/types/index";
import { Eye } from "lucide-react";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Recipes() {
  const [currentPage, setCurrentPage] = useState(0);
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
      <Card className="container flex justify-between">
        <h1 className="text-center font-bold text-2xl">LIST RECIPES</h1>
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
    </>
  );
}
