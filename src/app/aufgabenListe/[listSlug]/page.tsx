import { notFound } from "next/navigation";
import {
  loadTaskListBySlug,
  loadTaskLists,
} from "@/lib/contentful/apis/tasksList-api";
import TaskPreview from "@/components/TaskPreview";

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
    <>
      <h1 className="text-2xl font-bold mb-4">{taskList.name}</h1>

      <div className="flex flex-wrap gap-5 justify-center">
        {taskList.tasks.map((task, index) => (
          <TaskPreview
            key={index}
            task={task}
            shrinkToWidth={300}
            urlPrefix={`/aufgabenListe/${listSlug}`}
          />
        ))}
      </div>
    </>
  );
}
