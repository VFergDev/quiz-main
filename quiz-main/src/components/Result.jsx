import '../styles/result.scss';

const Result = (totalQuestions, result, onRestart) => {
  return (
    <div className="result">
        <h3>Your Score</h3>
        <p>
          Total Questions: <span>{totalQuestions}</span>
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
  )
}

export default Result
