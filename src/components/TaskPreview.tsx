import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import Link from "next/link";
import { Card } from "./ui/card";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
type TaskViewProps = {
  task: Task;
  shrinkToWidth: number;
  urlPrefix: string;
};

export default function TaskPreview({
  task,
  shrinkToWidth,
  urlPrefix,
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
      <Card
        className="p-3 gap-0 flex flex-col items-center min-h-120"
        style={{
          width: 350,
          boxSizing: "border-box",
        }}
      >
        <div className="w-280 min-h-50 flex justify-center">
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

        <h3
          className="text-lg font-bold mb-2"
          style={{
            marginTop: 12,
            textAlign: "left",
            width: "100%",
            height: "56px",
            overflow: "hidden",
          }}
        >
          {task.name}
        </h3>

        <div className="w-full">
          {task.shortDescription ?? "Beschreibung fehlt"}
        </div>

        <Link
          href={`${urlPrefix}/aufgabe/${task.slug}`}
          className="mt-auto hover:underline flex items-center gap-1"
          style={{
            textAlign: "left",
            width: "100%",
          }}
        >
          Zur Aufgabe
          <ChevronRightIcon
            style={{ width: 18, height: 18 }}
            aria-hidden="true"
          />
        </Link>
      </Card>
    </div>
  );
}
