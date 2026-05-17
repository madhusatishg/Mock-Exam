import { useState } from "react";
import testsData from "./data/tests.json";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import ResultsPage from "./components/ResultsPage";
import "./App.css";

function App() {
  const [view, setView] = useState("home");
  const [activeTest, setActiveTest] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  const handleStartTest = (test) => {
    setActiveTest(test);
    setView("quiz");
  };

  const handleFinishQuiz = (results) => {
    setQuizResults(results);
    setView("results");
  };

  const handleRetakeTest = () => {
    setView("quiz");
    setQuizResults(null);
  };

  const handleHome = () => {
    setView("home");
    setActiveTest(null);
    setQuizResults(null);
  };

  return (
    <div className="app">
      {view === "home" && (
        <HomePage tests={testsData} onStartTest={handleStartTest} />
      )}
      {view === "quiz" && activeTest && (
        <QuizPage
          test={activeTest}
          onFinish={handleFinishQuiz}
          onHome={handleHome}
        />
      )}
      {view === "results" && quizResults && (
        <ResultsPage
          results={quizResults}
          test={activeTest}
          onRetake={handleRetakeTest}
          onHome={handleHome}
        />
      )}
    </div>
  );
}

export default App;
