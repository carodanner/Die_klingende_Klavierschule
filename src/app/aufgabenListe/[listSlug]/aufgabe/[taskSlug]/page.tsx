import { notFound } from "next/navigation";
import TaskView from "@/components/TaskView";
import {
  loadTaskListBySlug,
  loadTaskLists,
} from "@/lib/contentful/apis/tasksList-api";
export async function generateStaticParams() {
  const taskLists = await loadTaskLists();

  const allParams = await Promise.all(
    taskLists.map(async (list) => {
      return list.tasks.map((task) => ({
        listSlug: list.slug,
        taskSlug: task.slug,
      }));
    })
  );

  return allParams.flat();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ listSlug: string; taskSlug: string }>;
  searchParams: Promise<{ preview: string }>;
}) {
  const { listSlug, taskSlug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";

  const [taskList] = await Promise.all([loadTaskListBySlug(listSlug)]);

  if (!taskList) {
    notFound();
  }

  const task = taskList.tasks.find((t) => t.slug === taskSlug);

  if (!task) {
    notFound();
  }

  return (
    <main className="flex-1 w-full bg-white">
      <TaskView
        task={task}
        preview={isPreview}
        backUrl={`/aufgabenListe/${listSlug}`}
      />
    </main>
  );
}
