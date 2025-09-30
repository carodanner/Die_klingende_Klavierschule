import { Asset, AssetFile } from "contentful";

export type ImageWrapper = {
  filename: string;
  url: string;
  contentType: string;
};

export function extractImage(asset?: Asset): ImageWrapper | undefined {
  const file = asset?.fields?.file;
  return extract(file as AssetFile);
}

function extract(file: AssetFile | undefined): ImageWrapper | undefined {
  if (!file?.url || !file?.fileName || !file?.contentType) {
    return undefined;
  }

  return {
    url: `https:${file.url}`,
    filename: `${file.fileName}`,
    contentType: `${file.contentType}`,
  };
}
