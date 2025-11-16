import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import Link from "next/link";
type TaskViewProps = {
  task: Task;
  shrinkToWidth: number;
  urlPrefix: string;
  index?: number;
};

export default function TaskPreview({
  task,
  shrinkToWidth,
  urlPrefix,
  index,
}: TaskViewProps) {
  let imageHeight = shrinkToWidth;
  if (task.imageWidth && task.imageHeight) {
    imageHeight = (task.imageHeight / task.imageWidth) * shrinkToWidth;
  }

  let imageUrl = task.image?.url;
  if (imageUrl) {
    imageUrl = imageUrl + `?w=${shrinkToWidth}&fit=scale&fm=webp&q=75`;
  }

  return (
    <div>
      <div
        className="p-3 gap-0 flex flex-col items-center h-70"
        style={{
          width: 350,
          boxSizing: "border-box",
        }}
      >
        <Link
          href={`${urlPrefix}/aufgabe/${task.slug}`}
          className="flex justify-center"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={task.name}
              width={shrinkToWidth}
              height={imageHeight}
              style={{ display: "block" }}
            />
          )}
        </Link>

        <h3
          className="text-lg font-bold mb-2"
          style={{
            marginTop: 12,
            textAlign: "left",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {index !== undefined ? `${index + 1}. ` : ""}
          {task.name}
        </h3>
      </div>
    </div>
  );
}
