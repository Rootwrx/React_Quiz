import { useQuiz } from "../contexts/QuizContext";
import { formatTime } from "../lib/utils";

const useQuizResults = () => {
  const { state, totalQuestions, dispatch } = useQuiz();
  const {
    answersHistory,
    endTime,
    startTime,
    points: earnedPoints,
    passingScore,
  } = state;
  const { totalPoints } = state.quiz;

  const correctAnswers = answersHistory.reduce(
    (acc, answer) => (answer.isCorrect ? acc + 1 : acc),
    0
  );
  const incorrectAnswers = totalQuestions - correctAnswers;

  const timeSpent =
    startTime && endTime
      ? formatTime(Math.floor(+(endTime - startTime) / 1000))
      : 0;

  const scorePercentage = Math.round((earnedPoints / totalPoints) * 100);
  const passed = scorePercentage >= passingScore;

  return {
    correctAnswers,
    incorrectAnswers,
    earnedPoints,
    totalPoints,
    timeSpent,
    scorePercentage,
    passed,
    dispatch,
  };
};

export default useQuizResults;
