import { ACTIONS } from "./config";
import { useQuiz } from "./contexts/QuizContext";
import { formatTime } from "./lib/utils";

const StartPage = () => {
  const { state, dispatch } = useQuiz();
  const { quiz } = state;

  const handleStart = () => {
    dispatch([ACTIONS.START_QUIZ]);
  };

  return (
    <div className="text-center py-8">
      {/* Quiz Title */}
      <h1 className="text-4xl font-bold mb-4 text-white">
        {quiz?.title || "Quiz"}
      </h1>

      {/* Quiz Description */}
      {quiz?.description && (
        <p className="text-lg text-gray-200 mb-8">{quiz.description}</p>
      )}

      {/* Quiz Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
        {/* Total Questions */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-400">
            {quiz?.questions?.length || 0}
          </div>
          <div className="text-sm text-gray-300 mt-1">Questions</div>
        </div>

        {/* Time Limit */}
        {quiz?.timeLimit && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-400">
              {formatTime(quiz.timeLimit)}
            </div>
            <div className="text-sm text-gray-300 mt-1">Time Limit</div>
          </div>
        )}

        {/* Passing Score */}
        {quiz?.passingScore && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-400">
              {quiz.passingScore}%
            </div>
            <div className="text-sm text-gray-300 mt-1">Passing Score</div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gray-700 rounded-lg p-6 mb-8 max-w-2xl mx-auto text-left">
        <h2 className="text-xl font-semibold mb-3 text-white">Instructions:</h2>
        <ul className="space-y-2 text-gray-200">
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Read each question carefully before answering</span>
          </li>
          {/* <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Select the best answer from the given options</span>
          </li> */}
          {quiz?.timeLimit && (
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              <span>Complete the quiz within the time limit</span>
            </li>
          )}
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>
              You need to score {quiz?.passingScore || 70}% or higher to pass
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>Once started, you cannot pause the quiz</span>
          </li>
        </ul>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Start Quiz
      </button>

      {/* Total Points Info */}
      {quiz?.questions && (
        <p className="text-gray-300 mt-6 text-sm">
          Total Points:
          {quiz.totalPoints}
        </p>
      )}
    </div>
  );
};

export default StartPage;
