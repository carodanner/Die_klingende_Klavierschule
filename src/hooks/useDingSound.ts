import { useMemo } from "react";

/**
 * Custom hook that provides a pre-configured Audio element for the ding sound.
 * The audio element is memoized to prevent unnecessary re-creation.
 *
 * @returns HTMLAudioElement configured for the ding sound
 */
export function useDingSound(): HTMLAudioElement | null {
  return useMemo(() => {
    // Check if we're in the browser environment
    if (typeof window === "undefined") {
      return null;
    }

    const audio = new Audio("/sounds/ding.mp3");
    audio.preload = "auto";
    return audio;
  }, []);
}
