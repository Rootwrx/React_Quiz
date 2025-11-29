
const CircularProgress = ({ passed, scorePercentage }) => {
  return (
    <svg className="w-40 h-40 transform -rotate-90">
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke="currentColor"
        strokeWidth="12"
        fill="none"
        className="text-gray-700"
      />
      <circle
        cx="80"
        cy="80"
        r="70"
        stroke="currentColor"
        strokeWidth="12"
        fill="none"
        strokeDasharray={`${2 * Math.PI * 70}`}
        strokeDashoffset={`${2 * Math.PI * 70 * (1 - scorePercentage / 100)}`}
        className={passed ? "text-green-500" : "text-orange-500"}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CircularProgress;
