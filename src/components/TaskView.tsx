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
  prevTaskSlug?: string | null;
  nextTaskSlug?: string | null;
  listSlug?: string;
};

export default function TaskView({
  task,
  preview,
  backUrl,
  prevTaskSlug,
  nextTaskSlug,
  listSlug,
}: TaskViewProps) {
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

          {/* Navigation Buttons */}
          <div
            className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-8 z-20 pointer-events-none"
            style={{ width: "100%" }}
          >
            <div className="pointer-events-auto">
              {prevTaskSlug ? (
                <Link
                  href={`/aufgabenListe/${listSlug}/aufgabe/${prevTaskSlug}`}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/images/prev.svg"
                    alt="Vorherige Aufgabe"
                    width={60}
                    height={60}
                    className="rounded-full shadow hover:scale-105 transition-transform"
                    priority
                  />
                </Link>
              ) : (
                <div style={{ width: 60, height: 60 }} />
              )}
            </div>
            <div className="pointer-events-auto">
              {nextTaskSlug ? (
                <Link
                  href={`/aufgabenListe/${listSlug}/aufgabe/${nextTaskSlug}`}
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/images/next.svg"
                    alt="Nächste Aufgabe"
                    width={60}
                    height={60}
                    className="rounded-full shadow hover:scale-105 transition-transform"
                    priority
                  />
                </Link>
              ) : (
                <div style={{ width: 60, height: 60 }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </AudioProvider>
  );
}
