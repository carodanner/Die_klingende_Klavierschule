import TaskPreview from "@/components/TaskPreview";
import { loadTasks } from "@/lib/contentful/apis/tasks-api";
import React from "react";

export default async function Page() {
  const tasks = await loadTasks();

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {tasks.map((task) => (
        <TaskPreview
          key={task.id}
          task={task}
          shrinkToWidth={300}
          urlPrefix=""
        />
      ))}
    </div>
  );
}
