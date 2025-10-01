"use client";

import { ClickArea } from "@/lib/contentful/apis/clickArea-api";
import { useState, useRef } from "react";

type ClickAreaViewProps = {
  clickArea: ClickArea;
  preview?: boolean;
};

export default function ClickAreaView({ clickArea, preview }: ClickAreaViewProps) {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (clickArea.sounds.length === 0) return;

    // If audio is currently playing, stop it
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    // Get the next sound to play
    const soundToPlay = clickArea.sounds[currentSoundIndex];
    if (!soundToPlay) return;

    // Create new audio element
    const audio = new Audio(soundToPlay.url);
    audioRef.current = audio;

    // Set up event listeners
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => {
      setIsPlaying(false);
      // Move to next sound for next click
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
    };
    audio.onerror = (error) => {
      setIsPlaying(false);
      console.error(`Failed to play sound: ${soundToPlay.url}, error: ${error}`);
    };

    // Play the sound
    audio.play().catch((error) => {
      setIsPlaying(false);
      console.error(`Error playing sound: ${soundToPlay.url}, error: ${error}`);
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: clickArea.x,
        top: clickArea.y,
        width: clickArea.width,
        height: clickArea.height,
        border: preview ? "2px dashed red" : "none",
        cursor: "pointer",
        background: preview ? "rgba(255,0,0,0.1)" : "transparent",
      }}
      onClick={handleClick}
    />
  );
}
