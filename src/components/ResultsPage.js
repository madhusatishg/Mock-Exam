import "./ResultsPage.css";

export default function ResultsPage({ results, test, onRetake, onHome }) {
  const total = results.length;
  const correct = results.filter((r) => r.isCorrect).length;
  const wrong = total - correct;
  const pct = Math.round((correct / total) * 100);

  const grade =
    pct >= 90 ? { label: "Excellent", color: "#22c55e", emoji: "🏆" } :
    pct >= 75 ? { label: "Good", color: "#6c63ff", emoji: "🎯" } :
    pct >= 60 ? { label: "Average", color: "#f59e0b", emoji: "📈" } :
    { label: "Needs Work", color: "#ef4444", emoji: "📚" };

  return (
    <div className="results">
      <div className="results-bg-orb" />

      <header className="results-header">
        <button className="home-link" onClick={onHome}>← Back to Home</button>
        <span className="results-test-name">{test.title}</span>
      </header>

      <main className="results-main">
        {/* Score hero */}
        <div className="score-hero animate-in">
          <div className="score-emoji">{grade.emoji}</div>
          <div
            className="score-ring"
            style={{ "--pct": pct, "--grade-color": grade.color }}
          >
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" className="ring-bg" />
              <circle
                cx="60" cy="60" r="50"
                className="ring-fill"
                strokeDasharray={`${(pct / 100) * 314} 314`}
                style={{ stroke: grade.color }}
              />
            </svg>
            <div className="score-inner">
              <span className="score-pct">{pct}%</span>
              <span className="score-frac">{correct}/{total}</span>
            </div>
          </div>
          <div className="score-grade" style={{ color: grade.color }}>
            {grade.label}
          </div>
          <div className="score-stats">
            <div className="stat correct-stat">
              <span className="stat-num">{correct}</span>
              <span className="stat-label">Correct</span>
            </div>
            <div className="stat-divider" />
            <div className="stat wrong-stat">
              <span className="stat-num">{wrong}</span>
              <span className="stat-label">Wrong</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">{total}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>

          <div className="result-actions">
            <button className="retake-btn" onClick={onRetake}>
              🔄 Retake Test
            </button>
            <button className="home-btn" onClick={onHome}>
              ⌂ All Tests
            </button>
          </div>
        </div>

        {/* Question review */}
        <section className="review-section">
          <h2 className="review-title">Question Review</h2>
          <div className="review-list">
            {results.map((r, i) => (
              <div
                key={i}
                className={`review-card ${r.isCorrect ? "rev-correct" : "rev-wrong"}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="review-card-header">
                  <span className="rev-num">Q{i + 1}</span>
                  <span className={`rev-badge ${r.isCorrect ? "badge-correct" : "badge-wrong"}`}>
                    {r.isCorrect ? "✓ Correct" : "✗ Wrong"}
                  </span>
                </div>
                <p className="rev-question">{r.question}</p>

                <div className="rev-answers">
                  {r.selectedAnswer && !r.isCorrect && (
                    <div className="rev-answer wrong-answer">
                      <span className="rev-answer-label">Your answer:</span>
                      <span>{r.selectedAnswer}</span>
                    </div>
                  )}
                  {!r.selectedAnswer && (
                    <div className="rev-answer wrong-answer">
                      <span className="rev-answer-label">Your answer:</span>
                      <span className="unanswered">Not answered</span>
                    </div>
                  )}
                  <div className="rev-answer correct-answer">
                    <span className="rev-answer-label">Correct:</span>
                    <span>{r.correctAnswer}</span>
                  </div>
                </div>

                <div className="rev-explanation">
                  <span className="rev-exp-icon">💡</span>
                  <p>{r.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="results-footer-actions">
          <button className="retake-btn" onClick={onRetake}>
            🔄 Retake Test
          </button>
          <button className="home-btn" onClick={onHome}>
            ⌂ Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}
