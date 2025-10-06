import { notFound } from "next/navigation";
import { loadTaskBySlug, loadTasks } from "@/lib/contentful/apis/tasks-api";
import TaskView from "@/components/TaskView";

export async function generateStaticParams() {
  const tasks = await loadTasks();

  const allParams = await Promise.all(
    tasks.map((task) => ({
      slug: task.slug,
    }))
  );

  return allParams.flat();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;

  const isPreview = preview === "true";

  const [task] = await Promise.all([loadTaskBySlug(slug)]);

  if (!task) {
    notFound();
  }

  return (
      <main className="flex-1 w-full bg-white">
        <TaskView task={task} preview={isPreview} backUrl="/aufgabe" />
      </main>
  );
}
