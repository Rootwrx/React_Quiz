import { useQuiz } from "../contexts/QuizContext";
import { ACTIONS } from "../lib/config";
import { cn, formatTime } from "../lib/utils";
import { Option } from "./Option";
import { useEffect, useMemo, useState } from "react";

const Question = () => {
  const { state, dispatch, totalQuestions } = useQuiz();
  const { index, questions, answersHistory } = state;
  const question = questions[index];
  const isAnswered = answersHistory[index];

  const handleNext = () => {
    dispatch([ACTIONS.NEXT_QUESTION]);
  };

  if (!question) return <strong> Loading.... </strong>;
  return (
    <article className="px-5 py-5 rounded-xl max-w-[500px] mx-auto">
      {/* Start Header */}
      <header className="mb-6">
        {/* Questions Progress */}
        <div className="w-full mb-3 bg-gray-200 rounded-full ">
          <span
            className={cn(
              "block bg-linear-to-r from-purple-500 to-pink-500 text-xs h-4 rounded-full text-center "
            )}
            style={{
              width: `${((index + 1) / totalQuestions) * 100}%`,
            }}
          >
            {(((index + 1) / totalQuestions) * 100).toFixed(1)}%
          </span>
        </div>
        {/* End Questions Progress */}

        <p className="text-center font-bold">
          Question {index + 1} of {totalQuestions}
        </p>

        <div className="flex justify-between">
          <span className="block bg-linear-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm rounded-full ">
            Question {index + 1}
          </span>
          <span className="block bg-yellow-500 px-3 py-1 text-sm  rounded-full ">
            {question?.points} points
          </span>
        </div>
      </header>
      {/* End Header  */}

      {/* Start Divider */}
      <div className="h-1 my-6 bg-gray-500/60 rounded-full"></div>
      {/* End Divider */}

      {/* Question Text*/}
      <h2 className="text-center mb-6 text-2xl font-extrabold">
        {question?.question}
      </h2>

      {/* Options */}
      <Options />
      {/* End Options  */}

      <div className="flex items-center justify-between">
        <Timer />
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className=" disabled:opacity-70 disabled:cursor-not-allowed text-center mx-auto block px-10 py-4 border rounded-md bg-green-500 hover:not-disabled:bg-green-600 cursor-pointer"
        >
          {index + 1 == totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </article>
  );
};

const Options = () => {
  const { state } = useQuiz();
  const { index, questions } = state;
  const question = questions[index];

  const shuffeledOptions = useMemo(
    () => {
      console.log("index changed");
      return question?.options.sort(() => 0.5 - Math.random());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  );
  return (
    <div className="flex mb-6 flex-col items-start gap-3">
      {shuffeledOptions?.map((option, i) => (
        <Option key={option} option={option} optionIndex={i} />
      ))}
    </div>
  );
};
const Timer = () => {
  const { state, dispatch } = useQuiz();
  const { timeLimit } = state.quiz;

  const [remainingTime, setRemainingTime] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          dispatch([ACTIONS.TIMEOUT]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, dispatch]);

  return <span> {formatTime(remainingTime)}</span>;
};

export default Question;
