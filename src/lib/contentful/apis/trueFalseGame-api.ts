import { Asset, Entry, EntrySkeletonType } from "contentful";
import { AssetWrapper, extractAsset, extractAssets } from "./asset-api";
import { ClickArea, ClickAreaSkeleton, mapToClickArea } from "./clickArea-api";
import { mapToQuestion, Question, QuestionSkeleton } from "./question-api";

export type TrueFalseGame = {
  id: string;
  name: string;
  start: ClickArea;
  questions: Question[];
  answerAreas: ClickArea[];
  successSound?: AssetWrapper;
  errorSounds: AssetWrapper[];
  correctAnswerSounds: AssetWrapper[];
  isSequence: boolean;
};

type TrueFalseGameFields = {
  name: string;
  start?: Entry<ClickAreaSkeleton>;
  questions?: Array<Entry<QuestionSkeleton>>;
  answerAreas?: Array<Entry<ClickAreaSkeleton>>;
  successSound?: Asset;
  errorSounds?: Asset[];
  correctAnswerSounds?: Asset[];
  isSequence?: boolean;
};

export type TrueFalseGameSkeleton = EntrySkeletonType<
  TrueFalseGameFields,
  "trueFalseGame"
>;

export function mapToTrueFalseGame(
  entry: Entry<TrueFalseGameSkeleton, undefined, string>
): TrueFalseGame | undefined {
  if (!entry || !entry.fields) return undefined;

  const fields = entry.fields;

  const startClickArea = fields.start
    ? mapToClickArea(
        fields.start as Entry<ClickAreaSkeleton, undefined, string>
      )
    : undefined;
  if (!startClickArea) return undefined;

  let questions: Question[] = [];
  if (Array.isArray(entry.fields?.questions)) {
    questions = (entry.fields.questions as Array<Entry<QuestionSkeleton>>)
      .map((entry) =>
        mapToQuestion(entry as Entry<QuestionSkeleton, undefined, string>)
      )
      .filter((question): question is Question => question !== undefined);
  }

  let answerAreas: ClickArea[] = [];
  if (Array.isArray(entry.fields?.answerAreas)) {
    answerAreas = (entry.fields.answerAreas as Array<Entry<ClickAreaSkeleton>>)
      .map((entry) => mapToClickArea(entry as Entry<ClickAreaSkeleton, undefined, string>))
      .filter((area): area is ClickArea => area !== undefined);
  }

  return {
    id: entry.sys.id,
    name: fields.name,
    start: startClickArea,
    questions: questions,
    answerAreas: answerAreas,
    successSound: extractAsset(fields.successSound),
    errorSounds: extractAssets(fields.errorSounds || []),
    correctAnswerSounds: extractAssets(fields.correctAnswerSounds || []),
    isSequence: !!fields.isSequence,
  };
}
