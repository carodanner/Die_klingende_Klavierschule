import { Asset, Entry, EntrySkeletonType } from "contentful";
import { AssetWrapper, extractAsset, extractAssets } from "./asset-api";
import { ClickArea, ClickAreaSkeleton, mapToClickArea } from "./clickArea-api";
import { mapToQuestion, Question, QuestionSkeleton } from "./question-api";

export type Game = {
  id: string;
  name: string;
  start: ClickArea;
  questions: Question[];
  answerAreas: ClickArea[];
  successSound?: AssetWrapper;
  errorSounds: AssetWrapper[];
  correctAnswerSounds: AssetWrapper[];
  type: "Einfach" | "Sequenz" | "Sammlung" | undefined;
};

type GameFields = {
  name: string;
  start?: Entry<ClickAreaSkeleton>;
  questions?: Array<Entry<QuestionSkeleton>>;
  answerAreas?: Array<Entry<ClickAreaSkeleton>>;
  successSound?: Asset;
  errorSounds?: Asset[];
  correctAnswerSounds?: Asset[];
  type: "Einfach" | "Sequenz" | "Sammlung" | undefined;
};

export type GameSkeleton = EntrySkeletonType<GameFields, "trueFalseGame">;

export function mapToGame(
  entry: Entry<GameSkeleton, undefined, string>
): Game | undefined {
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
      .map((entry) =>
        mapToClickArea(entry as Entry<ClickAreaSkeleton, undefined, string>)
      )
      .filter((area): area is ClickArea => area !== undefined);
  }

  console.log("Mapped Game:", entry.sys.id, fields.name, fields.type);

  return {
    id: entry.sys.id,
    name: fields.name,
    start: startClickArea,
    questions: questions,
    answerAreas: answerAreas,
    successSound: extractAsset(fields.successSound),
    errorSounds: extractAssets(fields.errorSounds || []),
    correctAnswerSounds: extractAssets(fields.correctAnswerSounds || []),
    type: fields.type,
  };
}
