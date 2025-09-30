import { loadTaskLists } from "@/lib/contentful/apis/tasksList-api";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const taskLists = await loadTaskLists();

  return (
    <>
      {taskLists.map((list) => (
        <div key={list.id}>
          <h2>{list.name}</h2>
          <p>
            <Link href={`/aufgabenListe/${list.slug}`}>{list.slug}</Link>
          </p>
        </div>
      ))}
    </>
  );
}
