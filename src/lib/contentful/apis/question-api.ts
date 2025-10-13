import { Asset, Entry, EntrySkeletonType } from "contentful";
import { AssetWrapper, extractAsset, extractAssets } from "./asset-api";
import { ClickArea, ClickAreaSkeleton, mapToClickArea } from "./clickArea-api";

export type Question = {
  id: string;
  name: string;
  question: AssetWrapper;
  correctAnswers: ClickArea[];
  specificErrorSounds: AssetWrapper[];
  specificCorrectSounds: AssetWrapper[];
};

type QuestionFields = {
  name: string;
  question: Asset;
  correctAnswers: Array<Entry<ClickAreaSkeleton>>;
  specificErrorSounds: Asset[];
  specificCorrectSounds: Asset[];
};

export type QuestionSkeleton = EntrySkeletonType<QuestionFields, "question">;

export function mapToQuestion(
  entry: Entry<QuestionSkeleton, undefined, string>
): Question | undefined {
  if (!entry || !entry.fields) return undefined;

  const fields = entry.fields;

  const correctAnswers: ClickArea[] = [];
  if (Array.isArray(fields.correctAnswers)) {
    (fields.correctAnswers as Array<Entry<ClickAreaSkeleton>>).forEach(
      (clickAreaEntry) => {
        const clickArea = mapToClickArea(
          clickAreaEntry as Entry<ClickAreaSkeleton, undefined, string>
        );
        if (clickArea) {
          correctAnswers.push(clickArea);
        }
      }
    );
  }

  const questionAsset = extractAsset(fields.question);
  if (!questionAsset) return undefined;

  return {
    id: entry.sys.id,
    name: fields.name,
    question: questionAsset,
    correctAnswers: correctAnswers,
    specificErrorSounds: extractAssets(fields.specificErrorSounds),
    specificCorrectSounds: extractAssets(fields.specificCorrectSounds),
  };
}
