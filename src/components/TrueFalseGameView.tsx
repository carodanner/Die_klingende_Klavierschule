import { useState } from "react";
import { TrueFalseGame } from "@/lib/contentful/apis/trueFalseGame-api";
import { Question } from "@/lib/contentful/apis/question-api";
import { useAudio } from "@/contexts/AudioContext";
import ClickAreaView from "./ClickAreaView";
import { ClickArea } from "@/lib/contentful/apis/clickArea-api";
import { AssetWrapper } from "@/lib/contentful/apis/asset-api";
import { trackEvent } from "fathom-client";

const FATHOM_ENABLED = process.env.NEXT_PUBLIC_FATHOM_ENABLED === "true";

type TrueFalseGameViewProps = {
  game: TrueFalseGame;
  eventName: string;
  preview?: boolean;
};

export default function TrueFalseGameView({
  game,
  eventName,
  preview,
}: TrueFalseGameViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [questions, setQuestions] = useState<Question[]>(
    shuffleQuestions(game.questions)
  );
  const { playAudio } = useAudio();

  const startGame = () => {
    setCurrentQuestionIndex(0);
    if (FATHOM_ENABLED) {
      trackEvent("Starte Spiel: " + eventName, { _value: 100 });
    }
    playAudio(new Audio(game.start.sounds[0]?.url), () => {
      playAudio(new Audio(questions[0]?.question.url));
    });
  };

  const handleAnswerClick = (area: ClickArea) => {
    if (
      currentQuestionIndex === -1 ||
      currentQuestionIndex >= questions.length
    ) {
      startGame();
      return;
    }

    const question = questions[currentQuestionIndex];

    // if correct answer
    if (question.correctAnswers.some((answer) => answer.id === area.id)) {
      // if already last question, play success sound, reset game to beginning and reshuffle questions
      if (currentQuestionIndex === questions.length - 1) {
        playAudio(new Audio(game.successSound?.url));
        setCurrentQuestionIndex(-1);
        setQuestions(shuffleQuestions(game.questions));
        if (FATHOM_ENABLED) {
          trackEvent("Spiel erfolgreich abgeschlossen: " + eventName, {
            _value: 100,
          });
        }
        // if not last question, play correct answer sound and go to next question
      } else {
        playAudio(getRandomSound(game.correctAnswerSounds), () => {
          playAudio(
            new Audio(questions[currentQuestionIndex + 1]?.question.url)
          );
        });
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      // if wrong answer, play error sound and question again
      const failureSound =
        question.specificErrorSounds.length > 0
          ? getRandomSound(question.specificErrorSounds)
          : getRandomSound(game.errorSounds);
      playAudio(failureSound, () => {
        playAudio(new Audio(questions[currentQuestionIndex].question.url));
      });
    }
  };

  return (
    <>
      <div onClick={startGame}>
        <ClickAreaView clickArea={game.start} preview={preview} />
      </div>
      {game.answerAreas.map((area) => (
        <div key={area.id} onClick={() => handleAnswerClick(area)}>
          <ClickAreaView clickArea={area} preview={preview} />
        </div>
      ))}
    </>
  );
}

const getRandomSound = (sounds: AssetWrapper[]): HTMLAudioElement => {
  return new Audio(sounds[Math.floor(Math.random() * sounds.length)].url);
};

const shuffleQuestions = (array: Question[]): Question[] => {
  return array.sort(() => Math.random() - 0.5);
};
