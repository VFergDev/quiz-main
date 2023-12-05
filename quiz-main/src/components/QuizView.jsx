/* eslint-disable react/prop-types */
import { useState } from "react";
import { resultInitialState } from "../constants";
import "../styles/quiz.scss";
import AnswerTimer from "./AnswerTimer";

// eslint-disable-next-line react/prop-types
const QuizView = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(false);
  const [inputAnswer, setInputAnswer] = useState("");

  const { question, options, correctAnswer, type } =
    questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const onClickNext = (finalAnswer) => {
    setAnswerIdx(null);
    setShowAnswerTimer(false);
    setInputAnswer("");
    setResult((prev) =>
      finalAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setShowAnswerTimer(true);
    });
  };

  const onRestart = () => {
    setResult(resultInitialState);
    setShowResult(false);
  };

  const handleTimeUp = () => {
    setAnswer(false);
    onClickNext(false);
  };

  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);

    if (e.target.value === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
  };

  const startQuiz = () => {
    setCurrentQuestion(1);
    setShowAnswerTimer(true);
    setResult((prev) => ({
      ...prev,
      score: prev.score + 5,
      correctAnswers: prev.correctAnswers + 1,
      introPointsAwarded: true, // Optionally, you can add a flag to track intro points
    }));
  };

  const getAnswerUI = () => {
    if (type === "Intro") {
      return (
        <div>
          <p id="intro">Welcome to the React.js <br />Performance Quiz!</p>
          <p id="subtitle">The first one is always free</p>
          <p id="instructions">Get ready before we dive in. <br />You have 15 seconds for each question.<br />Click start quiz when you are ready.</p>
          <div className="footer">
            <button onClick={startQuiz}>Start Quiz</button>
          </div>
        </div>
      );
    }

    if (type === "FIB") {
      return <input value={inputAnswer} onChange={handleInputChange} />;
    }

    if (type === "TF") {
      return (
        <div>
          <label>
            <input
              type="radio"
              name="tfOptions"
              value="true"
              checked={answer === true}
              onChange={() => setAnswer(true)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="tfOptions"
              value="false"
              checked={answer === false}
              onChange={() => setAnswer(false)}
            />
            False
          </label>
        </div>
      );
    }

    return (
      <ul>
        {options.map((answer, index) => (
          <li
            onClick={() => onAnswerClick(answer, index)}
            key={answer}
            className={answerIdx === index ? "selected-answer" : null}
          >
            {answer}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          {showAnswerTimer && (
            <AnswerTimer duration={15} onTimeUp={handleTimeUp} />
          )}
          <span className="active-question-no">{currentQuestion + 1}</span>
          <span className="total-question">/{questions.length} </span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className="footer">
            {type !== "Intro" && (
              <button
                onClick={() => onClickNext(answer)}
                disabled={
                  (type === "TF" && !answer === null) ||
                  (answerIdx === null && !inputAnswer)
                }
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={onRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
