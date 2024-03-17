"use client";

import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import Image from "next/image";
import Cookie from "js-cookie";
import Link from "next/link";
import { ArrowLeft, Edit, LucideTrash2 } from "lucide-react";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { useEffect } from "react";

dayjs.locale(ptBR);

export default async function MemoryPage(context: any) {
  const token = Cookie.get("token");

  const { params } = context;

  const id = params.slug;

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories = response.data;

  function deleteMemory() {
    api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <Link
          href={`/memories/upload/${memories.id}`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <Edit className="h-4 w-4" />
          Editar
        </Link>
        <Link
          href={`/`}
          onClick={deleteMemory}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <LucideTrash2 className="h-4 w-4" />
          Excluir
        </Link>
      </div>
      <div className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memories.createdAt).format("D[ de ]MMMM[, ]YYYY")}
        </time>
        <Image
          src={memories.coverUrl}
          alt=""
          width={592}
          height={280}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memories.content}
        </p>
      </div>
    </div>
  );
}
