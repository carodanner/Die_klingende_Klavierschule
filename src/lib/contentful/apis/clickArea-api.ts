import { Entry, EntrySkeletonType } from "contentful";

export type ClickArea = {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // sounds: TODO Viet
};

type ClickAreaFields = {
  name: Record<string, string>;
  x: number;
  y: number;
  width: number;
  height: number;
  // sounds: TODO Viet
};

export type ClickAreaSkeleton = EntrySkeletonType<ClickAreaFields, "clickArea">;

export function mapToClickArea(
  entry: Entry<ClickAreaSkeleton, undefined, string>
): ClickArea | undefined {
  if (!entry) return undefined;

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    x: entry.fields.x,
    y: entry.fields.y,
    width: entry.fields.width,
    height: entry.fields.height,
  };
}
