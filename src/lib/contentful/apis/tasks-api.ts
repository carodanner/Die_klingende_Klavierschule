import { Asset, EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { getEntries } from "../client";
import { ClickArea, ClickAreaSkeleton, mapToClickArea } from "./clickArea-api";
import { Game, GameSkeleton, mapToGame } from "./game-api";
import { AssetWrapper, extractAsset } from "./asset-api";

export type Task = {
  id: string;
  name: string;
  slug: string;
  image?: AssetWrapper;
  imageHeight?: number;
  imageWidth?: number;
  shortDescription?: string;
  simpleInteractions: ClickArea[];
  games: Game[];
};

type TaskFields = {
  name: string;
  slug: string;
  image: Asset;
  imageHeight: number;
  imageWidth: number;
  shortDescription: string;
  simpleInteractions: Array<Entry<ClickAreaSkeleton>>;
  games: Array<Entry<GameSkeleton>>;
};

export type TaskSkeleton = EntrySkeletonType<TaskFields, "aufgabe">;

type TaskQuery = EntriesQueries<TaskSkeleton, undefined> & {
  [key: string]: unknown;
};

export async function loadTasks(): Promise<Task[]> {
  const query: TaskQuery = {
    content_type: "aufgabe",
    include: 10, // TODO maybe delete later so that we don't fetch too much data unnecessarily
  };

  const response = await getEntries<TaskSkeleton>(query);

  return response.items.map(mapToTask).filter((task) => task !== undefined);
}

export async function loadTaskBySlug(slug: string): Promise<Task | undefined> {
  const query: TaskQuery = {
    content_type: "aufgabe",
    "fields.slug": slug,
    include: 10,
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

  let games: Game[] = [];
  if (Array.isArray(entry.fields?.games)) {
    games = (entry.fields.games as Array<Entry<GameSkeleton>>)
      .map((entry) =>
        mapToGame(entry as Entry<GameSkeleton, undefined, string>)
      )
      .filter((game): game is Game => game !== undefined);
  }

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    slug: entry.fields.slug,
    image: extractAsset(entry.fields.image),
    imageHeight: entry.fields.imageHeight,
    imageWidth: entry.fields.imageWidth,
    shortDescription: entry.fields.shortDescription,
    simpleInteractions: clickAreas,
    games: games,
  };
}
