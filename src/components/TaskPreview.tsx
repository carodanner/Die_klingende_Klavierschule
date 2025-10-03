import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import Link from "next/link";
type TaskViewProps = {
  task: Task;
  shrinkToWidth: number;
};

export default function TaskPreview({ task, shrinkToWidth }: TaskViewProps) {
  console.log(`image url: ${task.image?.url}`);

  let imageHeight = shrinkToWidth;
  if (task.imageWidth && task.imageHeight) {
    imageHeight = (task.imageHeight / task.imageWidth) * shrinkToWidth;
  }

  let imageUrl = task.image?.url;
  if (imageUrl) {
    imageUrl = imageUrl + `?w=${shrinkToWidth}&fit=scale&fm=webp&q=75`;
  }

  return (
    <div key={task.id}>
      <h2>{task.name}</h2>
      <p>
        {task.shortDescription ?? "Beschreibung fehlt"}
        <br />
        <br />
        <Link href={`/aufgabe/${task.slug}`}>Zur Aufgabe</Link>
      </p>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={task.name}
          width={shrinkToWidth}
          height={imageHeight}
          style={{ display: "block" }}
        />
      )}
    </div>
  );
}
