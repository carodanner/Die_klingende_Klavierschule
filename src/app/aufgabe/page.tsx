import TaskPreview from "@/components/TaskPreview";
import { loadTasks } from "@/lib/contentful/apis/tasks-api";
import React from "react";

export default async function Page() {
  const tasks = await loadTasks();

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start md:ml-4">
      {tasks.map((task) => (
        <TaskPreview key={task.id} task={task} shrinkToWidth={300} />
      ))}
    </div>
  );
}
