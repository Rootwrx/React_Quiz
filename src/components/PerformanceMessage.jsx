// Performance Message Component
const PerformanceMessage = ({ scorePercentage }) => {
  const getMessage = () => {
    if (scorePercentage >= 90) {
      return "Outstanding work! You've mastered this quiz.";
    }
    if (scorePercentage >= 70) {
      return "Great job! You have a solid understanding of the material.";
    }
    if (scorePercentage >= 50) {
      return "Good effort! Review the material and try again to improve your score.";
    }
    return "Keep practicing! Review the explanations and take the quiz again.";
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-2">
        Performance Summary
      </h3>
      <p className="text-gray-300">{getMessage()}</p>
    </div>
  );
};

export default PerformanceMessage;
