"use client";
import { Task } from "@/lib/contentful/apis/tasks-api";
import ClickAreaView from "./ClickAreaView";
import GameView from "./GameView";
import { AudioProvider } from "@/contexts/AudioContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type TaskViewProps = {
  task: Task;
  preview?: boolean;
  backUrl?: string;
};

export default function TaskView({ task, preview, backUrl }: TaskViewProps) {
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const imageWidth = task.imageWidth ?? 893;
  const imageHeight = task.imageHeight ?? 500;

  return (
    <AudioProvider>
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${task.image?.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            aspectRatio: `${imageWidth} / ${imageHeight}`,
          }}
        >
          {/* Back button */}
          {backUrl && (
            <Link
              href={backUrl}
              className="absolute top-4 right-4 z-10"
              title="Zurück"
            >
              <Image
                src="/images/back.webp"
                alt="Zurück"
                width={60}
                height={60}
                className="rounded-full shadow hover:scale-105 transition-transform"
                priority
              />
            </Link>
          )}
          {/* Overlay interactive areas */}
          {task.simpleInteractions.map((area) => (
            <ClickAreaView
              key={area.id}
              clickArea={area}
              preview={preview}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              partOfGame={false}
            />
          ))}
          {task.games.map((game) => (
            <GameView
              key={game.id}
              game={game}
              preview={preview}
              eventName={task.slug}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              enabled={currentGameId === game.id}
              setCurrentGameId={setCurrentGameId}
            />
          ))}
        </div>
      </div>
    </AudioProvider>
  );
}
