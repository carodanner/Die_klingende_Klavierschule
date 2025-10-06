"use client";

import { ClickArea } from "@/lib/contentful/apis/clickArea-api";
import { useState, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";

type ClickAreaViewProps = {
  clickArea: ClickArea;
  preview?: boolean;
};

export default function ClickAreaView({
  clickArea,
  preview,
}: ClickAreaViewProps) {
  const [currentSoundIndex, setCurrentSoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { playAudio } = useAudio();

  const handleClick = () => {
    if (clickArea.sounds.length === 0) return;

    // If audio is currently playing, stop it and cycle to next sound
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
      return;
    }

    const soundToPlay = clickArea.sounds[currentSoundIndex];
    if (!soundToPlay) return;

    const audio = new Audio(soundToPlay.url);
    audioRef.current = audio;

    // Set up event listeners
    audio.onplay = () => setIsPlaying(true);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
    };
    audio.onerror = (error) => {
      setIsPlaying(false);
      console.error(
        `Failed to play sound: ${soundToPlay.url}, error: ${error}`
      );
    };

    // Use the global audio manager to play the sound
    playAudio(audio, () => {
      setIsPlaying(false);
      setCurrentSoundIndex((prev) => (prev + 1) % clickArea.sounds.length);
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
