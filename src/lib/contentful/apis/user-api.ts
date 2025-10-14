import { EntriesQueries, Entry, EntrySkeletonType } from "contentful";
import { getEntries } from "../simple-client";

type User = {
  id: string;
  name: string;
  password: string;
};

type UserFields = {
  name: string;
  password: string;
};

type UserSkeleton = EntrySkeletonType<UserFields, "user">;

type UserQuery = EntriesQueries<UserSkeleton, undefined> & {
  [key: string]: unknown;
};

async function loadUsers(): Promise<User[]> {
  const query: UserQuery = {
    content_type: "user",
  };

  const response = await getEntries<UserSkeleton>(query);

  return response.items.map(mapToUser).filter((user) => user !== undefined);
}

function mapToUser(
  entry: Entry<UserSkeleton, undefined, string>
): User | undefined {
  if (!entry || !entry.fields) return undefined;

  return {
    id: entry.sys.id,
    name: entry.fields.name,
    password: entry.fields.password,
  };
}

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

let userCache: User[] | undefined = undefined;
let cacheTimestamp: number | undefined = undefined;

async function getCachedUsers(): Promise<User[]> {
  const now = Date.now();
  if (
    !userCache ||
    !cacheTimestamp ||
    now - cacheTimestamp > CACHE_DURATION_MS
  ) {
    userCache = await loadUsers();
    cacheTimestamp = now;
  }
  return userCache;
}

export async function validateUser(
  name: string,
  password: string
): Promise<User | undefined> {
  const users = await getCachedUsers();
  return users.find((user) => user.name === name && user.password === password);
}
