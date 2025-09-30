import { Asset, EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { getEntries } from "../client";
import { ClickArea, ClickAreaSkeleton, mapToClickArea } from "./clickArea-api";
import { extractImage, ImageWrapper } from "./image-api";

export type Task = {
  id: string;
  name: string;
  slug: string;
  image?: ImageWrapper;
  simpleInteractions: ClickArea[];
};

type TaskFields = {
  name: Record<string, string>;
  slug: Record<string, string>;
  image: Asset;
  simpleInteractions: Array<Entry<ClickAreaSkeleton>>;
};

export type TaskSkeleton = EntrySkeletonType<TaskFields, "aufgabe">;

type TaskQuery = EntriesQueries<TaskSkeleton, undefined> & {
  [key: string]: unknown;
};

export async function loadTasks(): Promise<Task[]> {
  const query: TaskQuery = {
    content_type: "aufgabe",
  };

  const response = await getEntries<TaskSkeleton>(query);

  return response.items.map(mapToTask).filter((task) => task !== undefined);
}

export async function loadTaskBySlug(slug: string): Promise<Task | undefined> {
  const query: TaskQuery = {
    content_type: "aufgabe",
    "fields.slug": slug,
  };

  const response = await getEntries<TaskSkeleton>(query);
  if (response.items.length === 0) {
    return undefined;
  }

  return mapToTask(response.items[0]);
}

export function mapToTask(
  entry: Entry<TaskSkeleton, undefined, string>
): Task | undefined {
  if (!entry || !entry.fields) return undefined;

  let clickAreas: ClickArea[] = [];
  if (Array.isArray(entry.fields?.simpleInteractions)) {
    clickAreas = (
      entry.fields.simpleInteractions as Array<Entry<ClickAreaSkeleton>>
    )
      .map((entry) =>
        mapToClickArea(entry as Entry<ClickAreaSkeleton, undefined, string>)
      )
      .filter((ca): ca is ClickArea => ca !== undefined);
  }

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    image: extractImage(entry.fields.image),
    simpleInteractions: clickAreas,
  };
}
