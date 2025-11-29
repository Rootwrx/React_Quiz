import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, STATUS } from "../config";

const QuizContext = createContext();

const reducer = (state, action) => {
  switch (action[0]) {
    //  Step 1 : loading the data from API
    case ACTIONS.DATA_LOADING: {
      return { ...state, status: STATUS.LOADING };
    }
    // Step 2 : Show Start Screen (status is Ready)
    case ACTIONS.DATA_RECEIVED: {
      const data = action[1];
      return {
        ...state,
        status: STATUS.READY,
        quiz: data,
        questions: data.questions,
      };
    }

    case ACTIONS.START_QUIZ: {
      return { ...state, status: STATUS.ACTIVE, startTime: Date.now() };
    }

    case ACTIONS.NEXT_QUESTION: {
      const isFinished = state.index + 1 === state.questions.length;
      return {
        ...state,
        index: state.index + 1,
        endTime: isFinished ? Date.now() : 0,
        status: isFinished ? STATUS.FINISHED : state.status,
      };
    }

    case ACTIONS.SAVE_ANSWER: {
      const question = state.questions[state.index];
      const isCorrect = question.correctAnswer == action[1];
      const entry = {
        index: state.index,
        isCorrect: isCorrect,
        correctAnswer: question.correctAnswer,
        answer: action[1],
      };
      return {
        ...state,
        answersHistory: [...state.answersHistory, entry],
        points: state.points + (isCorrect ? question.points : 0),
      };
    }

    case ACTIONS.TIMEOUT: {
      return { ...state, status: STATUS.FINISHED };
    }
    case ACTIONS.RETAKE_QUIZ: {
      return {
        ...state,
        index: 0,
        points: 0,
        answersHistory: [],
        timeLimit: 200,
        startTime: 0,
        endTime: 0,
        status: STATUS.READY,
      };
    }
    default:
      throw new Error("Unknown action type ");
  }
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    index: 0,
    points: 0,
    answersHistory: [],
    status: STATUS.DATA_LOADING,
    questions: [],
    quiz: {},
    timeLimit: 200,
    startTime: 0, // When user clicks Start Quiz
    endTime: 0,
  });

  const totalQuestions = state?.questions.length;

  useEffect(() => {
    const fetchQuizes = async () => {
      dispatch([ACTIONS.DATA_LOADING]);

      try {
        const res = await fetch("http://localhost:3000/quiz");
        const data = await res.json();
        dispatch([ACTIONS.DATA_RECEIVED, data]);
      } catch (err) {
        dispatch([ACTIONS.DATA_FAILED], err.message);
      }
    };

    fetchQuizes();
  }, []);
  return (
    <QuizContext.Provider value={{ state, dispatch, totalQuestions }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context == undefined)
    throw new Error("Can't use Context outside QuizProvider");

  return context;
};

export default QuizProvider;
// eslint-disable-next-line react-refresh/only-export-components
export { useQuiz };
