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

      {taskList.tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.name}</h2>
          <p>
            <Link href={`/aufgabenListe/${taskList.slug}/aufgabe/${task.slug}`}>
              Zur Aufgabe springen
            </Link>
          </p>
        </div>
      ))}
    </>
  );
}
