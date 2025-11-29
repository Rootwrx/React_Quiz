import { useState } from "react";
import { cn } from "./lib/utils";
import { useQuiz } from "./contexts/QuizContext";
import { ACTIONS } from "./config";

export const Option = ({ option }) => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const { dispatch, state } = useQuiz();
  const { index, questions, answersHistory } = state;
  const USER_ANSWER = answersHistory[index];
  const question = questions[index];

  const handleSelectAnswer = () => {
    if (!USER_ANSWER) {
      dispatch([ACTIONS.SAVE_ANSWER, option]);
    }
  };

  const handleShowAnswer = (e) => {
    e.stopPropagation();
    setIsAnswerOpen((p) => !p);
  };

  let activeClass;

  if (USER_ANSWER?.answer === option) {
    if (USER_ANSWER.isCorrect) activeClass = "bg-green-500 hover:bg-green-400";
    else activeClass = "bg-red-500 hover:bg-red-400";
  } else activeClass = "hover:bg-purple-500";

  if (USER_ANSWER && USER_ANSWER.correctAnswer === option)
    activeClass = "bg-green-500 hover:bg-green-400";

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <div
        role="button"
        tabIndex={USER_ANSWER ? -1 : 0}
        aria-disabled={!!USER_ANSWER}
        onClick={handleSelectAnswer}
        className={cn(
          `flex justify-between items-center px-4 py-4 font-bold text-lg bg-gray-400 w-full text-left`,
          activeClass,
          USER_ANSWER ? "cursor-not-allowed opacity-90" : "cursor-pointer"
        )}
      >
        <span className="block flex-1">{option}</span>
        {USER_ANSWER && USER_ANSWER.correctAnswer === option && (
          <button
            type="button"
            className="text-[10px] cursor-pointer bg-green-900/50 px-1 rounded-md py-1 block"
            onClick={handleShowAnswer}
            aria-expanded={isAnswerOpen}
            aria-controls={`explanation-${index}`}
          >
            {isAnswerOpen ? "Hide" : "Show"} explanation
          </button>
        )}
      </div>
      {/* Showing the answer */}
      {isAnswerOpen && USER_ANSWER?.correctAnswer === option && (
        <div
          role="region"
          aria-label="Answer explanation"
          className="px-2 py-3 bg-gray-800"
        >
          {question.explanation}
        </div>
      )}
    </div>
  );
};
