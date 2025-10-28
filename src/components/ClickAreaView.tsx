"use client";

import { ClickArea } from "@/lib/contentful/apis/clickArea-api";
import { useState } from "react";
import { useAudio } from "@/contexts/AudioContext";

type ClickAreaViewProps = {
  clickArea: ClickArea;
  imageWidth: number;
  imageHeight: number;
  preview?: boolean;
};

export default function ClickAreaView({
  clickArea,
  preview,
  imageWidth,
  imageHeight,
}: ClickAreaViewProps) {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playAudio, stopAllAudio } = useAudio();

  // Calculate percentages
  const leftPercent = (clickArea.x / imageWidth) * 100;
  const topPercent = (clickArea.y / imageHeight) * 100;
  const widthPercent = (clickArea.width / imageWidth) * 100;
  const heightPercent = (clickArea.height / imageHeight) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    
    if (clickArea.sounds.length === 0) return;

    if (isPlaying) {
      stopAllAudio();
      setIsPlaying(false);
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
      return;
    }

    const soundToPlay = clickArea.sounds[currentSoundIndex];
    if (!soundToPlay) return;

    playAudio(new Audio(soundToPlay.url), () => {
      setIsPlaying(false);
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        width: `${widthPercent}%`,
        height: `${heightPercent}%`,
        border: preview ? "2px dashed red" : "none",
        cursor: "pointer",
        background: preview ? "rgba(255,0,0,0.1)" : "transparent",
      }}
      onClick={handleClick}
    />
  );
}
