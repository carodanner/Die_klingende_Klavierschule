import { EntriesQueries, EntrySkeletonType } from "contentful";
import { mapToTask, Task } from "../model/tasks";
import { getEntries } from "../contentful";

type TaskFields = {
  name: Record<string, string>;
  slug: Record<string, string>;
  // bild: string; TODO: German name? Also data type?
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
