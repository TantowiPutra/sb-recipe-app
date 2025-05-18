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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useSWR from "swr";
import { useState, useEffect } from "react";

import type { Notification } from "@/types/index";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, error, isLoading, mutate } = useSWR(
    `/api/notifications?page=${currentPage}`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    if (error) {
      alert("Terjadi Kesalahan Saat Fetching Data Notifikasi [-1]");
    }
  }, [error]);

  return (
    <>
      <Card className="container">
        <h1 className="text-center font-bold text-2xl">NOTIFICATIONS</h1>
      </Card>

      {isLoading ? (
        "Processing..."
      ) : (
        <Card className="mt-5">
          <CardContent>
            {!data?.recipes?.data ? (
              "Data Notifikasi Tidak Ditemukan"
            ) : (
              <Table>
                <TableCaption>List Notification</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Dibuat Pada</TableHead>
                    <TableHead>Dibuat Oleh</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recipes?.data &&
                    data.recipes.data.map(
                      (recipe: Notification, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {recipe.title}
                          </TableCell>
                          <TableCell>{recipe.title}</TableCell>
                          <TableCell>{recipe.created_at}</TableCell>
                          <TableCell>{recipe?.user?.name}</TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
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
