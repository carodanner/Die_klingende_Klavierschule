"use client";
import { useState } from "react";
import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import ClickAreaView from "./ClickAreaView";
import TrueFalseGameView from "./TrueFalseGameView";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AudioProvider } from "@/contexts/AudioContext";

type TaskViewProps = {
  task: Task;
  preview?: boolean;
};

export default function TaskView({ task, preview }: TaskViewProps) {


  return (
    <AudioProvider>
      
     <div
      className="mx-auto block"
      style={{
        position: "relative",
        width: task.imageWidth ?? 893,
        height: task.imageHeight ?? 500,
      }}
    >
      {task.image?.url && (
        <Image
          src={task.image.url ?? ""}
          alt={task.name}
          width={task.imageWidth ?? 893}
          height={task.imageHeight ?? 500}
          style={{ display: "block" }}
        />
      )}

      {task.simpleInteractions.map((area) => (
        <ClickAreaView key={area.id} clickArea={area} preview={preview} />
      ))}
      
      {task.trueFalseGames.map((game) => (
        <TrueFalseGameView key={game.id} game={game} preview={preview} />
      ))}
    </div>

    </AudioProvider>
  );
}
