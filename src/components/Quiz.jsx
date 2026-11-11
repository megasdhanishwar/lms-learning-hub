import { useState } from "react";
import { CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { quizzes } from "../data/courses";
import { useApp } from "../context/AppContext";

export default function Quiz({ courseId, lesson }) {
  const { saveQuiz, quizResults } = useApp();
  const questions = quizzes[lesson.quiz] || [];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const previous = quizResults[`${courseId}_${lesson.quiz}`];
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const submit = () => {
    setSubmitted(true);
    saveQuiz(courseId, lesson.quiz, {
      score,
      total: questions.length,
      completedAt: new Date().toISOString(),
    });
  };
  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };
  if (!questions.length)
    return <p className="muted">Quiz content is not available.</p>;
  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div>
          <span className="mini-label">KNOWLEDGE CHECK</span>
          <h3>Test what you've learned</h3>
        </div>
        <span className="quiz-question-count">
          {questions.length} questions
        </span>
      </div>
      {questions.map((q, i) => (
        <div className="quiz-question" key={i}>
          <div className="question-number">
            QUESTION {String(i + 1).padStart(2, "0")}
          </div>
          <h4>{q.question}</h4>
          <div className="quiz-options">
            {q.options.map((option, j) => (
              <button
                key={j}
                disabled={submitted}
                onClick={() => setAnswers((p) => ({ ...p, [i]: j }))}
                className={`quiz-option ${answers[i] === j ? "selected" : ""} ${submitted && j === q.answer ? "correct" : ""} ${submitted && answers[i] === j && j !== q.answer ? "incorrect" : ""}`}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + j)}
                </span>
                {option}
                {submitted && j === q.answer && <CheckCircle2 size={17} />}
                {submitted && answers[i] === j && j !== q.answer && (
                  <XCircle size={17} />
                )}
              </button>
            ))}
          </div>
          {submitted && (
            <p
              className={`answer-feedback ${answers[i] === q.answer ? "good" : "bad"}`}
            >
              {answers[i] === q.answer
                ? "Correct answer!"
                : "Not quite. Review the highlighted correct answer."}
            </p>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          className="button-primary quiz-submit"
          disabled={Object.keys(answers).length !== questions.length}
          onClick={submit}
        >
          Submit answers <CheckCircle2 size={16} />
        </button>
      ) : (
        <div className="quiz-result">
          <div className="result-trophy">
            <Trophy size={24} />
          </div>
          <div>
            <strong>
              {score} / {questions.length} correct
            </strong>
            <span>
              {Math.round((score / questions.length) * 100)}% ·{" "}
              {score === questions.length
                ? "Excellent work!"
                : "Keep practising — you've got this."}
            </span>
          </div>
          <button className="button-secondary" onClick={reset}>
            <RotateCcw size={15} /> Retake quiz
          </button>
        </div>
      )}
      {previous && !submitted && (
        <div className="previous-score">
          Previous attempt:{" "}
          <strong>
            {previous.score}/{previous.total}
          </strong>
        </div>
      )}
    </div>
  );
}
