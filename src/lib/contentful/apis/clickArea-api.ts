import { Asset, Entry, EntrySkeletonType } from "contentful";
import { extractSounds, SoundWrapper } from "./sounds-api";

export type ClickArea = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  sounds: SoundWrapper[];
};

type ClickAreaFields = {
  name: Record<string, string>;
  x: number;
  y: number;
  width: number;
  height: number;
  sounds: Asset[];
};

export type ClickAreaSkeleton = EntrySkeletonType<ClickAreaFields, "clickArea">;

export function mapToClickArea(
  entry: Entry<ClickAreaSkeleton, undefined, string>
): ClickArea | undefined {
  if (!entry || !entry.fields) return undefined;

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    x: entry.fields.x,
    y: entry.fields.y,
    width: entry.fields.width,
    height: entry.fields.height,
    sounds: extractSounds(entry.fields.sounds),
  };
}
