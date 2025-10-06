import ListView from "@/components/ListView";
import { loadTaskLists } from "@/lib/contentful/apis/tasksList-api";
import React from "react";

export default async function Page() {
  const taskLists = await loadTaskLists();

  return (
    <div className="flex flex-wrap gap-5 justify-center ml-4">
      {taskLists.map((list) => (
        <ListView key={list.id} taskList={list} />
      ))}
    </div>
  );
}
