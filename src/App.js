import { useEffect, useRef, useState } from "react";
import questions from "./Questions";

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
export default function App() {
  const [question, setQuestion] = useState(() => shuffleArray(questions));
  const [nextQ, setNextQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [correctScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const unanswered = useRef(0);

  // const [style, setStyle] = useState({});
  // const style = { color: "#d11768" };
  function handleBt() {
    if (nextQ < question.length - 1) {
      setNextQ((prev) => prev + 1);
      setSelected(null);
      setTimeLeft(15);
    } else {
      setFinished(true); // mark quiz as done
    }
    setDisableNext(false);
  }
  function handleChoice(index) {
    setDisableNext(true);
    if (selected === null) {
      setSelected(index);
      if (index === question[nextQ].answerIndex) {
        setCorrectScore((sc) => sc + 1);
      } else setIncorrectScore((is) => is + 1);
    }
  }
  function handleRetake() {
    setNextQ(0);
    setFinished(false);
    setCorrectScore(0);
    setIncorrectScore(0);
    setQuestion(shuffleArray(questions));
  }
  // function handleCorrectScore() {
  //   setCorrectScore((sc) => sc + 1);
  // }

  useEffect(
    function () {
      if (timeLeft === 0) {
        unanswered.current += 1;
        handleBt();

        return;
      }

      const timer = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    },
    [timeLeft]
  );

  return (
    <section>
      {finished ? (
        <div className="final-box">
          <h2>🎉 Quiz Finished!{}</h2>
          <h2>✅ Correct Answer: {correctScore}</h2>
          <h2>❌ Wrong Answer: {incorrectScore}</h2>
          <h2>Unanswered Question: {unanswered.current}</h2>
          <p>Do you want to retake again?</p>
          If yes click:{" "}
          <button className="again-bt" onClick={handleRetake}>
            Again
          </button>
        </div>
      ) : (
        <>
          <div className="score">
            <p>⌚ Time left: {timeLeft}</p>
            <p>❔ Total Questions: {question.length}</p>
            <p>✅ Correct Answer: {correctScore}</p>
            <p>❌ Wrong Answer: {incorrectScore}</p>
          </div>
          <div className="main-block">
            <div className="quest">
              <h4>
                {nextQ + 1}. {question[nextQ].question}
              </h4>
            </div>
            <div className="option">
              {question[nextQ].options.map((el, i) => {
                let bgColor = "";
                if (selected !== null) {
                  if (i === question[nextQ].answerIndex) {
                    bgColor = "lightgreen"; //correct choice
                  } else if (i === selected) {
                    bgColor = "salmon"; //wrong choice
                  }
                }
                return (
                  <p
                    key={i}
                    className={`choice `}
                    style={{ backgroundColor: bgColor, cursor: "pointer" }}
                    onClick={() => handleChoice(i)}
                  >
                    {el}
                  </p>
                );
              })}
            </div>
          </div>
          {disableNext && (
            <div className=" next-bt">
              <button onClick={handleBt}>Next</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
