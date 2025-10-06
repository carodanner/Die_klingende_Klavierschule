"use client";
import { Task } from "@/lib/contentful/apis/tasks-api";
import ClickAreaView from "./ClickAreaView";
import TrueFalseGameView from "./TrueFalseGameView";
import { AudioProvider } from "@/contexts/AudioContext";

type TaskViewProps = {
  task: Task;
  preview?: boolean;
};

export default function TaskView({ task, preview }: TaskViewProps) {
  
  return (
    <AudioProvider>
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div
          className="relative w-full "
          style={{
            backgroundImage: `url(${task.image?.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            aspectRatio: `${task.imageWidth ?? 893} / ${task.imageHeight ?? 500}`,
          }}
        >
          {/* Overlay interactive areas */}
          {task.simpleInteractions.map((area) => (
            <ClickAreaView
              key={area.id}
              clickArea={area}
              preview={preview}
              imageWidth={task.imageWidth ?? 893}
              imageHeight={task.imageHeight ?? 500}
            />
          ))}
          {task.trueFalseGames.map((game) => (
            <TrueFalseGameView key={game.id} game={game} preview={preview} />
          ))}
        </div>
      </div>
    </AudioProvider>
  );
}
