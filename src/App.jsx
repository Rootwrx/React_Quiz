import { STATUS } from "./config";
import { useQuiz } from "./contexts/QuizContext";
import Question from "./Question";
import StartPage from "./StartPage";
import FinishScreen from "./components/FinishScreen";

function App() {
  const { state } = useQuiz();
  const { status, error } = state;

  return (
    <>
      <div className="min-h-screen w-screen overflow-hidden bg-gray-900 text-white">
        <div className="w-[700px] mx-auto  max-w-[90%] px-5 py-5 rounded-md bg-gray-600 mt-10">
          {status == STATUS.LOADING && <p className="text-center"> Loading </p>}
          {status == STATUS.READY && <StartPage />}
          {status == STATUS.ACTIVE && <Question />}

          {status == STATUS.FINISHED && <FinishScreen />}

          {error && <strong> Error Happened : {error} </strong>}
        </div>
      </div>
    </>
  );
}

export default App;
