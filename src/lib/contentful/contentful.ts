import {
  createClient,
  EntriesQueries,
  EntrySkeletonType,
  Entry,
  ContentfulCollection,
} from "contentful";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const isPreview = process.env.CONTENTFUL_USE_PREVIEW === "true";
const LOAD_FROM_CACHE_ENABLED =
  process.env.CONTENTFUL_USE_CACHED_RESULTS === "true";
const SAVE_TO_CACHE_ENABLED = process.env.CONTENTFUL_CACHE_JSON === "true";

const CACHE_ROOT =
  process.env.CONTENTFUL_CACHE_JSON_ROOT || "./.contentful-cache";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: isPreview
    ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
    : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
  host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
});

export async function getEntries<
  T extends EntrySkeletonType,
  Q extends EntriesQueries<T, undefined> = EntriesQueries<T, undefined>
>(query: Q): Promise<ContentfulCollection<Entry<T, undefined, string>>> {
  const type = getTypeFromQuery(query);

  if (LOAD_FROM_CACHE_ENABLED) {
    const cached = await loadEntriesJsonFromCache<T, Q>(type, query);
    if (cached) return cached;
    console.log("Cache miss for", type);
  }

  const result = await client.getEntries<T>(query);
  if (SAVE_TO_CACHE_ENABLED) {
    await cacheJson(type, query, result);
  }
  return result;
}

// Type guard for object
function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

function getTypeFromQuery(query: unknown): string {
  if (isObject(query) && typeof query.content_type === "string") {
    return query.content_type;
  }
  if (
    isObject(query) &&
    isObject(query.sys) &&
    typeof query.sys.type === "string"
  ) {
    return query.sys.type;
  }
  return "unknown";
}

function getFileName(type: string, query: unknown): string {
  const queryString = JSON.stringify(query || {});
  const hash = crypto.createHash("sha1").update(queryString).digest("hex");
  return `${type}_${hash}.json`;
}

async function cacheJson(
  type: string,
  query: unknown,
  data: unknown
): Promise<void> {
  try {
    const dir = path.join(CACHE_ROOT, type);
    await fs.mkdir(dir, { recursive: true });
    const fileName = getFileName(type, query);
    const filePath = path.join(dir, fileName);
    await fs.writeFile(
      filePath,
      JSON.stringify({ query, data }, null, 2),
      "utf-8"
    );
    // console.log(`Cached JSON for ${type} with ${fileName}`);
  } catch {
    // console.log("Failed to cache JSON for", type, error);
  }
}

async function loadJsonFromCache<T>(
  type: string,
  query: unknown,
  assert: (data: unknown) => T
): Promise<T | null> {
  try {
    const dir = path.join(CACHE_ROOT, type);
    const fileName = getFileName(type, query);
    const filePath = path.join(dir, fileName);
    const file = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(file);
    return assert(parsed.data);
  } catch {
    // console.log("Failed to load cache for", type, error);
    return null;
  }
}

async function loadEntriesJsonFromCache<
  T extends EntrySkeletonType,
  Q extends EntriesQueries<T, undefined> = EntriesQueries<T, undefined>
>(
  type: string,
  query: Q
): Promise<ContentfulCollection<Entry<T, undefined, string>> | null> {
  return loadJsonFromCache(
    type,
    query,
    (data) => data as ContentfulCollection<Entry<T, undefined, string>>
  );
}
