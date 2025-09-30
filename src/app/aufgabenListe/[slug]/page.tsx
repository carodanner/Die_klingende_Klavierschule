import { notFound } from "next/navigation";
import {
  loadTaskListBySlug,
  loadTaskLists,
} from "@/lib/contentful/apis/tasksList-api";
import Link from "next/link";

export async function generateStaticParams() {
  const taskLists = await loadTaskLists();

  const allParams = await Promise.all(
    taskLists.map((list) => ({
      slug: list.slug,
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

  const [taskList] = await Promise.all([loadTaskListBySlug(slug)]);

  if (!taskList) {
    notFound();
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{taskList.name}</h1>

      {taskList.tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.name}</h2>
          <p>
            <Link href={`/aufgabe/${task.slug}`}>{task.slug}</Link>
          </p>
        </div>
      ))}
    </>
  );
}
