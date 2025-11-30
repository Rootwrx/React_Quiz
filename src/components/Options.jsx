import { useMemo } from "react";
import { useQuiz } from "../contexts/QuizContext";
import { Option } from "./Option";

const Options = () => {
  const { state } = useQuiz();
  const { index, questions } = state;
  const question = questions[index];

  const shuffeledOptions = useMemo(
    () => {
      return question?.options
        ? [...question.options].sort(() => 0.5 - Math.random())
        : [];
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

export default Options;
