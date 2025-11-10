import { notFound } from "next/navigation";
import TaskView from "@/components/TaskView";
import Image from "next/image";
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
      />
      <div className="flex justify-between items-center mt-8">
        {prevTask ? (
          <a
            href={`/aufgabenListe/${listSlug}/aufgabe/${prevTask.slug}`}
            className="flex items-center gap-2 ml-5"
          >
            <Image
              src="/images/prev.svg"
              alt="Vorherige Aufgabe"
              width={60}
              height={60}
              className="rounded-full shadow hover:scale-105 transition-transform"
              priority
            />
          </a>
        ) : (
          <div />
        )}
        {nextTask ? (
          <a
            href={`/aufgabenListe/${listSlug}/aufgabe/${nextTask.slug}`}
            className="flex items-center gap-2 mr-5"
          >
            <Image
              src="/images/next.svg"
              alt="Nächste Aufgabe"
              width={60}
              height={60}
              className="rounded-full shadow hover:scale-105 transition-transform"
              priority
            />
          </a>
        ) : (
          <div />
        )}
      </div>
    </main>
  );
}
