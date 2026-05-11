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
    const previous = currentAudioRef.current;
    if (previous) {
      previous.onended = null;
      previous.onerror = null;
      previous.pause();
      previous.currentTime = 0;
    }

    if (!audio) {
      currentAudioRef.current = null;
      return;
    }

    currentAudioRef.current = audio;

    audio.onended = () => {
      if (currentAudioRef.current === audio) {
        currentAudioRef.current = null;
      }
      onEnded?.();
    };

    audio.onerror = () => {
      if (currentAudioRef.current === audio) {
        currentAudioRef.current = null;
      }
    };

    audio.play().catch((error) => {
      // AbortError is expected when a still-pending play() is interrupted by
      // pause() above (rapid successive clicks); don't treat it as an error.
      if (error?.name === "AbortError") return;
      console.error("Error playing audio:", error);
      if (currentAudioRef.current === audio) {
        currentAudioRef.current = null;
      }
    });
  };

  const stopAllAudio = () => {
    const current = currentAudioRef.current;
    if (current) {
      current.onended = null;
      current.onerror = null;
      current.pause();
      current.currentTime = 0;
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
