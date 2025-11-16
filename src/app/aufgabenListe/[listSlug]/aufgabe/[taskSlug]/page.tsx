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

  // Find current task index
  const currentIndex = taskList.tasks.findIndex((t) => t.slug === taskSlug);
  const prevTask = currentIndex > 0 ? taskList.tasks[currentIndex - 1] : null;
  const nextTask =
    currentIndex < taskList.tasks.length - 1
      ? taskList.tasks[currentIndex + 1]
      : null;

  return (
    <main className="flex-1 w-full bg-white">
      <TaskView
        task={task}
        preview={isPreview}
        backUrl={`/aufgabenListe/${listSlug}`}
        prevTaskSlug={prevTask?.slug}
        nextTaskSlug={nextTask?.slug}
        listSlug={listSlug}
      />
    </main>
  );
}
