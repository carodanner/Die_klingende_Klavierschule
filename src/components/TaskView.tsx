"use client";
import { useState } from "react";
import Image from "next/image";
import { Task } from "@/lib/contentful/apis/tasks-api";
import ClickAreaView from "./ClickAreaView";
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AudioProvider } from "@/contexts/AudioContext";

type TaskViewProps = {
  task: Task;
  preview?: boolean;
};

export default function TaskView({ task, preview }: TaskViewProps) {
  const [showModal, setShowModal] = useState(false);

  const content = (
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
    </div>
  );

  return (
    <AudioProvider>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold">{task.name}</span>
        <button
          type="button"
          className="p-2 rounded hover:bg-gray-200"
          onClick={() => setShowModal(true)}
          title="Vollbild anzeigen"
        >
          <ArrowsPointingOutIcon className="h-8 w-12 text-gray-700" />
        </button>
      </div>
      {content}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg relative flex flex-col items-center w-full max-w-5xl p-4 mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute top-2 right-2 p-2 rounded"
              onClick={() => setShowModal(false)}
              title="Schließen"
            >
              <XMarkIcon className="h-8 w-8 text-black" />
            </button>
            <div className="w-full flex items-center justify-center">
              {content}
            </div>
          </div>
        </div>
      )}
    </AudioProvider>
  );
}
