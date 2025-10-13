import { useState } from "react";
import { Game } from "@/lib/contentful/apis/game-api";
import { Question } from "@/lib/contentful/apis/question-api";
import { useAudio } from "@/contexts/AudioContext";
import ClickAreaView from "./ClickAreaView";
import { ClickArea } from "@/lib/contentful/apis/clickArea-api";
import { AssetWrapper } from "@/lib/contentful/apis/asset-api";
import { trackEvent } from "fathom-client";
import { useDingSound } from "@/hooks/useDingSound";

const FATHOM_ENABLED = process.env.NEXT_PUBLIC_FATHOM_ENABLED === "true";

type GameViewProps = {
  game: Game;
  eventName: string;
  preview?: boolean;
};

export default function GameView({ game, eventName, preview }: GameViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [questions, setQuestions] = useState<Question[]>(
    shuffleQuestions(game.questions)
  );
  const [currentSequenceAnswerIndex, setCurrentSequenceAnswerIndex] =
    useState<number>(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<string>>(
    new Set()
  );
  const dingSound = useDingSound();
  const { playAudio } = useAudio();
  const isSequence = game.type === "Sequenz";

  const playSuccessAndResetGame = () => {
    playAudio(new Audio(game.successSound?.url));
    setCurrentQuestionIndex(-1);
    setQuestions(shuffleQuestions(game.questions));
    if (FATHOM_ENABLED) {
      trackEvent("Spiel erfolgreich abgeschlossen: " + eventName, {
        _value: 100,
      });
    }
  };

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
    const correctSound =
      question.specificCorrectSounds.length > 0
        ? getRandomSound(question.specificCorrectSounds)
        : getRandomSound(game.correctAnswerSounds);
    const failureSound =
      question.specificErrorSounds.length > 0
        ? getRandomSound(question.specificErrorSounds)
        : getRandomSound(game.errorSounds);

    // Separate logic for sequence game
    if (isSequence) {
      if (question.correctAnswers[currentSequenceAnswerIndex].id === area.id) {
        // Last answer in sequence
        if (currentSequenceAnswerIndex === question.correctAnswers.length - 1) {
          setCurrentSequenceAnswerIndex(0);
          // Last question => play success sound, reset game to beginning and reshuffle questions
          if (currentQuestionIndex === questions.length - 1) {
            playSuccessAndResetGame();
          } else {
            playAudio(correctSound, () => {
              playAudio(
                new Audio(questions[currentQuestionIndex + 1]?.question.url)
              );
            });
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }
          // Not last answer in sequence => play ding sound and move on to next answer in sequence
        } else {
          setCurrentSequenceAnswerIndex(currentSequenceAnswerIndex + 1);
          playAudio(dingSound);
        }
      } else {
        playAudio(failureSound, () => {
          // playAudio(new Audio(questions[currentQuestionIndex]?.question.url)); // TODO: play question again for sequence?
        });
      }

      return;
    }

    // Collection and simple true/false game logic
    if (question.correctAnswers.some((answer) => answer.id === area.id)) {
      // If already answered correctly once, do nothing
      if (answeredCorrectly.has(area.id)) {
        return;
      }

      const newAnsweredCorrectly = answeredCorrectly.add(area.id);

      const correctAnswerIds = question.correctAnswers.map(
        (answer) => answer.id
      );
      const uniqueAnswerIds = correctAnswerIds.filter(
        (value, index) => correctAnswerIds.indexOf(value) === index
      ); // This is to prevent user error of adding the same answer twice

      // All answers in a collection are answered correctly
      if (newAnsweredCorrectly.size === uniqueAnswerIds.length) {
        setAnsweredCorrectly(new Set());

        // Last question => play success sound, reset game to beginning and reshuffle questions
        if (currentQuestionIndex === questions.length - 1) {
          playSuccessAndResetGame();
          // if not last question, play correct answer sound and go to next question
        } else {
          playAudio(correctSound, () => {
            playAudio(
              new Audio(questions[currentQuestionIndex + 1]?.question.url)
            );
          });
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        // Not all answers in a collection are answered correctly => play ding sound
      } else {
        playAudio(dingSound);
        setAnsweredCorrectly(newAnsweredCorrectly);
      }
    } else {
      // if wrong answer, play error sound and question again
      playAudio(failureSound, () => {
        // TODO: play question again even for collection?
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
