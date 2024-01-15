"use client"

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { UpdateMemoryForm } from '@/components/UpdateMemoryForm';
import Cookie from "js-cookie";

export default function UpdateMemory(context: any) {
  const [memory, setMemory] = useState(null);

  const token = Cookie.get("token");
  
  useEffect(() => {
    const fetchMemory = async () => {
      const { params } = context;

      const id = params.slug;
            try {
          console.log(id);
        const response = await api.get(`/memories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        
        setMemory(response.data);
        console.log(memory);
        
      } catch (error) {
        console.error('Error fetching memory data:', error);
      }
    };

    fetchMemory();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>


      {memory && <UpdateMemoryForm memory={memory} />}
    </div>
  );
}
