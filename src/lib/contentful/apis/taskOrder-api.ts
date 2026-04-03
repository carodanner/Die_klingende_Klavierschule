import { EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { getEntries } from "../client";
import { loadTasks, mapToTask, Task, TaskSkeleton } from "./tasks-api";

type TaskOrderFields = {
  name: string;
  tasks?: Array<Entry<TaskSkeleton, undefined, string>>;
};

export type TaskOrderSkeleton = EntrySkeletonType<
  TaskOrderFields,
  "taskOrder"
>;

type TaskOrderQuery = EntriesQueries<TaskOrderSkeleton, undefined> & {
  [key: string]: unknown;
};

const TASK_ORDER_ENTRY_NAME = "Aufgaben Reihenfolge";

/**
 * Tasks for the Klingende Karten overview, in CMS order.
 * Falls back to all tasks if the singleton entry is missing or has no resolvable tasks.
 */
export async function loadTasksInDisplayOrder(): Promise<Task[]> {
  const query: TaskOrderQuery = {
    content_type: "taskOrder",
    "fields.name": TASK_ORDER_ENTRY_NAME,
    limit: 1,
    include: 10,
  };

  const response = await getEntries<TaskOrderSkeleton>(query);
  const entry = response.items[0];
  const fields = entry?.fields as TaskOrderFields | undefined;
  if (!fields) {
    return loadTasks();
  }

  const raw = fields.tasks;
  if (!Array.isArray(raw) || raw.length === 0) {
    return loadTasks();
  }

  const tasks: Task[] = raw
    .map((linked) => mapToTask(linked))
    .filter((t): t is Task => t !== undefined);

  if (tasks.length === 0) {
    return loadTasks();
  }

  return tasks;
}
