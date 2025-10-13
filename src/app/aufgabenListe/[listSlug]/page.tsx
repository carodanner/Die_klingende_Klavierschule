import { notFound } from "next/navigation";
import {
  loadTaskListBySlug,
  loadTaskLists,
} from "@/lib/contentful/apis/tasksList-api";
import TaskPreview from "@/components/TaskPreview";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const taskLists = await loadTaskLists();

  const allParams = await Promise.all(
    taskLists.map((list) => ({
      listSlug: list.slug,
    }))
  );

  return allParams.flat();
}

export default async function Page({
  params,
}: {
  params: Promise<{ listSlug: string }>;
}) {
  const { listSlug } = await params;

  const [taskList] = await Promise.all([loadTaskListBySlug(listSlug)]);

  if (!taskList) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full">
        <Header />
      </div>
      <main className="max-w-7xl mx-auto w-full flex-1 mt-5">
        <h1 className="text-2xl font-bold mb-4">{taskList.name}</h1>

        <div className="flex flex-wrap gap-5 justify-center">
          {taskList.tasks.map((task, index) => (
            <TaskPreview
              index={index}
              key={index}
              task={task}
              shrinkToWidth={200}
              urlPrefix={`/aufgabenListe/${listSlug}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
