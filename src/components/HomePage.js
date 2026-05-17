import "./HomePage.css";

export default function HomePage({ tests, onStartTest }) {
  const categoryColors = {
    Insurance: "#6c63ff",
    Finance: "#f59e0b",
    Law: "#22c55e",
    General: "#06b6d4",
  };

  return (
    <div className="home">
      <div className="home-bg-orb orb1" />
      <div className="home-bg-orb orb2" />

      <header className="home-header">
        <div className="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">QuizForge</span>
        </div>
        <p className="logo-tagline">Master every concept. Ace every exam.</p>
      </header>

      <main className="home-main">
        <section className="hero">
          <h1 className="hero-title">
            Practice Tests
            <br />
            <span className="hero-accent">That Actually Help</span>
          </h1>
          <p className="hero-sub">
            Randomized questions, instant feedback, and clear explanations — so
            every attempt teaches you something new.
          </p>
        </section>

        <section className="tests-section">
          <div className="section-header">
            <h2 className="section-title">Available Tests</h2>
            <span className="section-count">{tests.length} test{tests.length !== 1 ? "s" : ""}</span>
          </div>

          <div className="tests-grid">
            {tests.map((test, i) => {
              const color = categoryColors[test.category] || "#6c63ff";
              return (
                <div
                  key={test.id}
                  className="test-card"
                  style={{ "--card-accent": color, animationDelay: `${i * 0.08}s` }}
                >
                  <div className="test-card-top">
                    <span
                      className="test-category"
                      style={{ background: `${color}22`, color }}
                    >
                      {test.category}
                    </span>
                    <span className="test-qcount">
                      {test.questions.length} Qs
                    </span>
                  </div>
                  <h3 className="test-title">{test.title}</h3>
                  <p className="test-desc">{test.description}</p>
                  <button
                    className="start-btn"
                    onClick={() => onStartTest(test)}
                    style={{ "--btn-color": color }}
                  >
                    Start Test
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="features">
          {[
            { icon: "🔀", title: "Randomized Every Time", desc: "Questions and options shuffle on each attempt — no memorizing positions." },
            { icon: "⚡", title: "Instant Feedback", desc: "Correct answers highlight green; wrong ones show red with the right answer." },
            { icon: "📖", title: "Detailed Explanations", desc: "Every question has a clear explanation to reinforce your understanding." },
            { icon: "📊", title: "Score Summary", desc: "See your performance breakdown at the end of every test." },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="feature-icon">{f.icon}</span>
              <h4 className="feature-title">{f.title}</h4>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="home-footer">
        <p>Add more tests by editing <code>src/data/tests.json</code></p>
      </footer>
    </div>
  );
}
