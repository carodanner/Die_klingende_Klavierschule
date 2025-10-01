import { Asset, AssetFile } from "contentful";

// TODO Viet: maybe rename ImageWrapper to AssetWrapper since the logic could be the same
export type SoundWrapper = {
  filename: string;
  url: string;
  contentType: string;
};

export function extractSound(asset?: Asset): SoundWrapper | undefined {
  const file = asset?.fields?.file;
  return extract(file as AssetFile);
}

export function extractSounds(assets?: Asset[]): SoundWrapper[] {
  if (!assets || !Array.isArray(assets)) {
    return [];
  }
  
  return assets
    .map(extractSound)
    .filter((sound): sound is SoundWrapper => sound !== undefined);
}

function extract(file: AssetFile | undefined): SoundWrapper | undefined {
  if (!file?.url || !file?.fileName || !file?.contentType) {
    return undefined;
  }

  return {
    url: `https:${file.url}`,
    filename: `${file.fileName}`,
    contentType: `${file.contentType}`,
  };
}
