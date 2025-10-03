import Link from "next/link";
import { Card } from "./ui/card";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { TaskList } from "@/lib/contentful/apis/tasksList-api";
type TaskViewProps = {
  taskList: TaskList;
};

export default function TaskPreview({ taskList }: TaskViewProps) {
  return (
    <div>
      <Card
        className="p-3 gap-0 flex flex-col items-center min-h-60"
        style={{
          width: 350,
          boxSizing: "border-box",
        }}
      >
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
          {taskList.name}
        </h3>

        <div className="w-full">
          {taskList.shortDescription ?? "Beschreibung fehlt"}
        </div>

        <Link
          href={`/aufgabenListe/${taskList.slug}`}
          className="mt-auto hover:underline flex items-center gap-1"
          style={{
            textAlign: "left",
            width: "100%",
          }}
        >
          Zur Liste
          <ChevronRightIcon
            style={{ width: 18, height: 18 }}
            aria-hidden="true"
          />
        </Link>
      </Card>
    </div>
  );
}
