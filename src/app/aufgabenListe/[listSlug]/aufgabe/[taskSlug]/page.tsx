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
}: {
  params: Promise<{ listSlug: string; taskSlug: string }>;
}) {
  const { listSlug, taskSlug } = await params;

  const [taskList] = await Promise.all([loadTaskListBySlug(listSlug)]);

  if (!taskList) {
    notFound();
  }

  const task = taskList.tasks.find((t) => t.slug === taskSlug);

  if (!task) {
    notFound();
  }

  //TODO navigation to next and previous task in the list
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>
      <TaskView task={task} preview={true} />
    </>
  );
}
