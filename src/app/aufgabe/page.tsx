import { loadTasks } from "@/lib/contentful/apis/tasks-api";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const tasks = await loadTasks();

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.name}</h2>
          <p>
            <Link href={`/aufgabe/${task.slug}`}>{task.slug}</Link>
          </p>
        </div>
      ))}
    </>
  );
}
