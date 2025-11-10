import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TaskPreview from "@/components/TaskPreview";
import { loadTasks } from "@/lib/contentful/apis/tasks-api";
import React from "react";

export default async function Page() {
  const tasks = await loadTasks();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>
      <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
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
      </main>
      <Footer />
    </div>
  );
}
