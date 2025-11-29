// Score Display Component
import CircularProgress from '../CircularProgress';
const ScoreDisplay = ({ scorePercentage, passed }) => (
  <div className="text-center mb-8">
    <div className="inline-block relative">
      <CircularProgress scorePercentage={scorePercentage} passed={passed} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div>
          <div className="text-5xl font-bold text-white">
            {scorePercentage}%
          </div>
          <div className="text-sm text-gray-400">Score</div>
        </div>
      </div>
    </div>
  </div>
);

export default ScoreDisplay;
