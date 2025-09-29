import { Entry } from "contentful";
import { TaskSkeleton } from "../apis/tasks-api";

export type Task = {
  id: string;
  name: string;
  slug: string;
  // bild: string; TODO: German name? Also data type?
};

export function mapToTask(
  entry: Entry<TaskSkeleton, undefined, string>
): Task | undefined {
  if (!entry) return undefined;

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    // bild: string; TODO: map bild
  };
}
