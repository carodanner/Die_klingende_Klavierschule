"use client";

import { createContext, useContext, useRef, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  playAudio: (audio: HTMLAudioElement | null, onEnded?: () => void) => void;
  stopAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  const playAudio = (audio: HTMLAudioElement | null, onEnded?: () => void) => {
    // Stop any currently playing audio
    if (currentAudioRef.current && !currentAudioRef.current.paused) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    if (!audio) return;

    // Set the new audio as current
    currentAudioRef.current = audio;

    // Set up event listeners
    audio.onended = () => {
      currentAudioRef.current = null;
      onEnded?.();
    };

    audio.onerror = () => {
      currentAudioRef.current = null;
    };

    // Play the new audio
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      currentAudioRef.current = null;
    });
  };

  const stopAllAudio = () => {
    if (currentAudioRef.current && !currentAudioRef.current.paused) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

  // Stop audio when pathname changes (user navigates to different page)
  useEffect(() => {
    stopAllAudio();
  }, [pathname]);

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playAudio, stopAllAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
