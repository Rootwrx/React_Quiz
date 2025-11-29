import { Award, Trophy } from "lucide-react";

const QuizHeader = ({ passed }) => (
  <div
    className={`p-8 text-center ${
      passed
        ? "bg-linear-to-r from-green-600 to-emerald-600"
        : "bg-linear-to-r from-orange-600 to-red-600"
    }`}
  >
    <div className="flex justify-center mb-4">
      {passed ? (
        <Trophy className="w-20 h-20 text-yellow-300" />
      ) : (
        <Award className="w-20 h-20 text-orange-200" />
      )}
    </div>
    <h1 className="text-4xl font-bold text-white mb-2">
      {passed ? "Congratulations!" : "Quiz Complete!"}
    </h1>
    <p className="text-xl text-white/90">
      {passed ? "You passed the quiz!" : "Keep practicing to improve!"}
    </p>
  </div>
);

export default QuizHeader;
