import { Asset, EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { mapToTask, Task } from "../model/tasks";
import { getEntries } from "../contentful";

type TaskFields = {
  name: Record<string, string>;
  slug: Record<string, string>;
  image: Asset;
  simpleInteractions: Array<Entry<ClickAreaSkeleton>>; // TODO Viet define the ClickArea fields, skeleton and Model based on contentful. then create a mapping function for clickareas.
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
