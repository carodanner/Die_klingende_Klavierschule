import { EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { getEntries } from "../client";
import { mapToTask, Task, TaskSkeleton } from "./tasks-api";

export type TaskList = {
  id: string;
  name: string;
  slug: string;
  tasks: Task[];
};

type TaskListFields = {
  name: string;
  slug: string;
  tasks: Array<Entry<TaskSkeleton>>;
};

export type TaskListSkeleton = EntrySkeletonType<TaskListFields, "taskList">;

type Query = EntriesQueries<TaskListSkeleton, undefined> & {
  [key: string]: unknown;
};

export async function loadTaskLists(): Promise<TaskList[]> {
  const query: Query = {
    content_type: "taskList",
  };

  const response = await getEntries<TaskListSkeleton>(query);

  return response.items.map(mapToTaskList).filter((task) => task !== undefined);
}

export async function loadTaskListBySlug(
  slug: string
): Promise<TaskList | undefined> {
  const query: Query = {
    content_type: "taskList",
    "fields.slug": slug,
    include: 4,
  };

  const response = await getEntries<TaskListSkeleton>(query);
  if (response.items.length === 0) {
    return undefined;
  }

  return mapToTaskList(response.items[0]);
}

function mapToTaskList(
  entry: Entry<TaskListSkeleton, undefined, string>
): TaskList | undefined {
  if (!entry) return undefined;

  let tasks: Task[] = [];

  if (Array.isArray(entry.fields?.tasks)) {
    tasks = (entry.fields.tasks as Array<Entry<TaskSkeleton>>)
      .map((entry) =>
        mapToTask(entry as Entry<TaskSkeleton, undefined, string>)
      )
      .filter((t): t is Task => t !== undefined);
  }

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    tasks: tasks,
  };
}
