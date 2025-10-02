import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import ClickAreaView from "./ClickAreaView";
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
    
      {task.simpleInteractions.map((area) => (
        <ClickAreaView key={area.id} clickArea={area} preview={preview} />
      ))}
    </div>
  );
}
