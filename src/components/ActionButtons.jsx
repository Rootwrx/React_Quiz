import { RotateCcw } from "lucide-react";

const ActionButtons = ({ onRetake }) => (
  <div className="flex gap-4">
    <button
      onClick={onRetake}
      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
    >
      <RotateCcw className="w-5 h-5" />
      Retake Quiz
    </button>
    <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors">
      Review Answers
    </button>
  </div>
);

export default ActionButtons;
