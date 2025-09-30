import { notFound } from "next/navigation";
import { loadTaskBySlug, loadTasks } from "@/lib/contentful/apis/tasks-api";
import Image from "next/image";

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

      <Image
        src={task.image?.url ?? ""}
        alt={task.name}
        width={893}
        height={500}
      />

      <pre>
        TODO Viet: create the overlay for putting the click areas in the correct
        position. <br />
        Add the sounds and play the sound on click.
        <br />
        Add a query parameter to the page. param is called preview. If preview
        is set to true, show the borders of the click areas.
        <br />
        <br />
        {JSON.stringify(task.simpleInteractions, null, 2)}
      </pre>
    </>
  );
}
