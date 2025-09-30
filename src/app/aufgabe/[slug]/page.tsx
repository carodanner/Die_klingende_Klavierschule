import { notFound } from "next/navigation";
import { loadTaskBySlug, loadTasks } from "@/lib/contentful/apis/tasks-api";

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [task] = await Promise.all([loadTaskBySlug(slug)]);

  if (!task) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>

      <p>TODO Viet: Render the JPEG and the clickable areas</p>
    </>
  );
}
