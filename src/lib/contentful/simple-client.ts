import {
  createClient,
  EntriesQueries,
  EntrySkeletonType,
  Entry,
  ContentfulCollection,
} from "contentful";

const isPreview = process.env.CONTENTFUL_USE_PREVIEW === "true";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: isPreview
    ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
    : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
  host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
});

export async function getEntries<
  T extends EntrySkeletonType,
  Q extends EntriesQueries<T, undefined> = EntriesQueries<T, undefined>,
>(query: Q): Promise<ContentfulCollection<Entry<T, undefined, string>>> {
  return client.getEntries<T>(query);
}
