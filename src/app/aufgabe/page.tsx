import TaskPreview from "@/components/TaskPreview";
import { loadTasks } from "@/lib/contentful/apis/tasks-api";
import React from "react";

export default async function Page() {
  const tasks = await loadTasks();

  return (
    <>
      {tasks.map((task) => (
        <TaskPreview key={task.id} task={task} shrinkToWidth={300} />
      ))}
    </>
  );
}
