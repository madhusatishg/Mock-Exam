import { useState, useMemo } from "react";
import "./QuizPage.css";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizPage({ test, onFinish, onHome }) {
  // Shuffle questions and options once on mount
  const shuffledQuestions = useMemo(() => {
    return shuffleArray(test.questions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options),
    }));
  }, [test]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const current = shuffledQuestions[currentIdx];
  const totalQ = shuffledQuestions.length;
  const answered = Object.keys(answers).length;
  const selectedAnswer = answers[current.id];
  const hasAnswered = selectedAnswer !== undefined;

  const handleSelect = (option) => {
    if (hasAnswered) return; // can't change answer
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    const results = shuffledQuestions.map((q) => ({
      question: q.question,
      options: q.shuffledOptions,
      correctAnswer: q.correctAnswer,
      selectedAnswer: answers[q.id] || null,
      isCorrect: answers[q.id] === q.correctAnswer,
      explanation: q.explanation,
    }));
    onFinish(results);
  };

  const getOptionClass = (option) => {
    if (!hasAnswered) return "option";
    if (option === current.correctAnswer) return "option correct";
    if (option === selectedAnswer) return "option wrong";
    return "option dimmed";
  };

  const getOptionIcon = (option) => {
    if (!hasAnswered) return null;
    if (option === current.correctAnswer) return "✓";
    if (option === selectedAnswer && option !== current.correctAnswer) return "✗";
    return null;
  };

  const progress = ((currentIdx + 1) / totalQ) * 100;

  return (
    <div className="quiz">
      {/* Header */}
      <header className="quiz-header">
        <button className="back-btn" onClick={() => setShowConfirmLeave(true)}>
          ← Home
        </button>
        <div className="quiz-title-wrap">
          <span className="quiz-test-name">{test.title}</span>
        </div>
        <div className="quiz-meta">
          <span className="quiz-progress-text">
            {currentIdx + 1} / {totalQ}
          </span>
          <span className="answered-badge">
            {answered} answered
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Main content */}
      <main className="quiz-main">
        <div className="question-card animate-in" key={current.id}>
          <div className="q-number">Question {currentIdx + 1}</div>
          <h2 className="q-text">{current.question}</h2>

          <div className="options-list">
            {current.shuffledOptions.map((option, i) => (
              <button
                key={i}
                className={getOptionClass(option)}
                onClick={() => handleSelect(option)}
                disabled={hasAnswered}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option-text">{option}</span>
                {getOptionIcon(option) && (
                  <span className="option-icon">{getOptionIcon(option)}</span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation — always shown after answering */}
          {hasAnswered && (
            <div className="explanation animate-in">
              <div className="explanation-header">
                <span className={`result-badge ${selectedAnswer === current.correctAnswer ? "correct-badge" : "wrong-badge"}`}>
                  {selectedAnswer === current.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                </span>
                {selectedAnswer !== current.correctAnswer && (
                  <span className="correct-label">
                    Correct: <strong>{current.correctAnswer}</strong>
                  </span>
                )}
              </div>
              <div className="explanation-body">
                <span className="explanation-icon">💡</span>
                <p>{current.explanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="quiz-nav">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={currentIdx === 0}
          >
            ← Previous
          </button>

          <div className="nav-dots">
            {shuffledQuestions.map((q, i) => {
              const a = answers[q.id];
              const isAnswered = a !== undefined;
              const isCorrect = a === q.correctAnswer;
              return (
                <button
                  key={q.id}
                  className={`nav-dot ${i === currentIdx ? "active" : ""} ${isAnswered ? (isCorrect ? "dot-correct" : "dot-wrong") : ""}`}
                  onClick={() => setCurrentIdx(i)}
                  title={`Q${i + 1}`}
                />
              );
            })}
          </div>

          {currentIdx < totalQ - 1 ? (
            <button
              className="nav-btn primary"
              onClick={handleNext}
            >
              Next →
            </button>
          ) : (
            <button
              className="nav-btn submit"
              onClick={handleSubmit}
            >
              Finish Test ✓
            </button>
          )}
        </div>

        {/* Bottom action row */}
        <div className="quiz-actions">
          <p className="quiz-hint">
            {!hasAnswered
              ? "Select an answer to see feedback and explanation."
              : currentIdx < totalQ - 1
              ? "Press Next to continue."
              : answered < totalQ
              ? `${totalQ - answered} question${totalQ - answered !== 1 ? "s" : ""} unanswered — use the dots to navigate.`
              : "All answered! Press Finish Test."}
          </p>
          {answered === totalQ && currentIdx === totalQ - 1 && (
            <button className="submit-big" onClick={handleSubmit}>
              Submit & See Results
            </button>
          )}
        </div>
      </main>

      {/* Confirm leave modal */}
      {showConfirmLeave && (
        <div className="modal-overlay" onClick={() => setShowConfirmLeave(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Leave Test?</h3>
            <p>Your progress will be lost. Are you sure?</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowConfirmLeave(false)}>
                Keep Going
              </button>
              <button className="modal-confirm" onClick={onHome}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
