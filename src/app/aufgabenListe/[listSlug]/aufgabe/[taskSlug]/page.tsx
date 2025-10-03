import { notFound } from "next/navigation";
import TaskView from "@/components/TaskView";
import {
  loadTaskListBySlug,
  loadTaskLists,
} from "@/lib/contentful/apis/tasksList-api";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

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
    <>
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>
      <TaskView task={task} preview={isPreview} />
      <div className="flex justify-between items-center mt-8">
        {prevTask ? (
          <a
            href={`/aufgabenListe/${listSlug}/aufgabe/${prevTask.slug}`}
            className="flex items-center gap-2 ml-5"
          >
            <ArrowLongLeftIcon className="w-12 h-12" />
            <span className="text-2xl font-bold">Zurück</span>
          </a>
        ) : (
          <div />
        )}
        {nextTask ? (
          <a
            href={`/aufgabenListe/${listSlug}/aufgabe/${nextTask.slug}`}
            className="flex items-center gap-2 mr-5"
          >
            <span className="text-2xl font-bold">Weiter</span>
            <ArrowLongRightIcon className="w-12 h-12" />
          </a>
        ) : (
          <div />
        )}
      </div>
    </>
  );
}
