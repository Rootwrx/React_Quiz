import { CheckCircle, Clock, Target, XCircle } from "lucide-react";
import { StatCard } from './StatCard';

// Stats Grid Component
const StatsGrid = ({
  correctAnswers,
  incorrectAnswers,
  earnedPoints,
  totalPoints,
  timeSpent,
}) => (
  <div className="grid grid-cols-2 gap-4 mb-8">
    <StatCard
      icon={CheckCircle}
      value={correctAnswers}
      label="Correct Answers"
      color="text-green-500"
    />
    <StatCard
      icon={XCircle}
      value={incorrectAnswers}
      label="Incorrect Answers"
      color="text-red-500"
    />
    <StatCard
      icon={Target}
      value={`${earnedPoints}/${totalPoints}`}
      label="Points Earned"
      color="text-blue-500"
    />
    <StatCard
      icon={Clock}
      value={timeSpent}
      label="Time Spent"
      color="text-purple-500"
    />
  </div>
);

export default StatsGrid