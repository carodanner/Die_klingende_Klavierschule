import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
type TaskViewProps = {
  task: Task;
  preview?: boolean;
};

export default function TaskView({ task, preview }: TaskViewProps) {
  return (
    <div
      style={{
        position: "relative",
        width: 893,
        height: 500,
      }}
    >
      {task.image?.url && (
        <Image
          src={task.image.url ?? ""}
          alt={task.name}
          width={893}
          height={500}
          style={{ display: "block" }}
        />
      )}
      {/* Render clickable areas */}
      {task.simpleInteractions.map((area) => (
        <div
          key={area.id}
          style={{
            position: "absolute",
            left: area.x,
            top: area.y,
            width: area.width,
            height: area.height,
            border: preview ? "2px dashed red" : "none",
            cursor: "pointer",
            background: preview ? "rgba(255,0,0,0.1)" : "transparent",
          }}
          title={area.name}
        />
      ))}
    </div>
  );
}
