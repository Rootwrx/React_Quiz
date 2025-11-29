import { ACTIONS } from "../config";
import ActionButtons from "./ActionButtons";
import PerformanceMessage from "./PerformanceMessage";
import QuizHeader from "./QuizHeader";
import ScoreDisplay from "./ScoreDisplay";
import StatsGrid from "./StatsGrid";
import useQuizResults from "./useQuizResutls";

const FinishScreen = () => {
  const {
    correctAnswers,
    incorrectAnswers,
    earnedPoints,
    totalPoints,
    timeSpent,
    scorePercentage,
    passed,
    dispatch,
  } = useQuizResults();

  const handleRetake = () => {
    dispatch([ACTIONS.RETAKE_QUIZ]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <QuizHeader passed={passed} />

        <div className="p-8">
          <ScoreDisplay scorePercentage={scorePercentage} passed={passed} />

          <StatsGrid
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            earnedPoints={earnedPoints}
            totalPoints={totalPoints}
            timeSpent={timeSpent}
          />

          <PerformanceMessage scorePercentage={scorePercentage} />

          <ActionButtons onRetake={handleRetake} />
        </div>
      </div>
    </div>
  );
};

export default FinishScreen;
