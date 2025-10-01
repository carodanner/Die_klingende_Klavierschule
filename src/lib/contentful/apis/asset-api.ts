import { Asset, AssetFile } from "contentful";

export type AssetWrapper = {
  filename: string;
  url: string;
  contentType: string;
};

export function extractAsset(asset?: Asset): AssetWrapper | undefined {
  const file = asset?.fields?.file;
  return extract(file as AssetFile);
}

export function extractAssets(assets?: Asset[]): AssetWrapper[] {
  if (!assets || !Array.isArray(assets)) {
    return [];
  }
  
  return assets
    .map(extractAsset)
    .filter((asset): asset is AssetWrapper => asset !== undefined);
}

function extract(file: AssetFile | undefined): AssetWrapper | undefined {
  if (!file?.url || !file?.fileName || !file?.contentType) {
    return undefined;
  }

  return {
    url: `https:${file.url}`,
    filename: `${file.fileName}`,
    contentType: `${file.contentType}`,
  };
}
