import { useState } from "react";
import questions from "./Questions";
export default function App() {
  const [nextQ, setNextQ] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [CorrectScore, setCorrectScore] = useState(0);
  const [incorrectScore, setIncorrectScore] = useState(0);

  // const [style, setStyle] = useState({});
  // const style = { color: "#d11768" };
  function handleBt() {
    if (nextQ < questions.length - 1) {
      setNextQ((prev) => prev + 1);
      setSelected(null);
    } else {
      setFinished(true); // mark quiz as done
    }
  }
  function handleChoice(index) {
    if (selected === null) {
      setSelected(index);
      if (index === questions[nextQ].answerIndex) {
        setCorrectScore((sc) => sc + 1);
      } else setIncorrectScore((is) => is + 1);
    }
  }
  function handleRetake() {
    setNextQ(0);
    setFinished(false);
    setCorrectScore(0);
    setIncorrectScore(0);
  }
  // function handleCorrectScore() {
  //   setCorrectScore((sc) => sc + 1);
  // }
  return (
    <section>
      {finished ? (
        <div className="final-box">
          <h2>🎉 Quiz Finished!{}</h2>
          <h2>✅ Correct Answer: {CorrectScore}</h2>
          <h2>❌ Wrong Answer: {incorrectScore}</h2>
          <p>Do you want to retake again?</p>
          If yes click:{" "}
          <button className="again-bt" onClick={handleRetake}>
            Again
          </button>
        </div>
      ) : (
        <>
          <div className="score">
            <p>✅ Correct Answer: {CorrectScore}</p>
            <p>❌ Wrong Answer: {incorrectScore}</p>
          </div>
          <div className="main-block">
            <div className="quest">
              <h4>
                {nextQ + 1}. {questions[nextQ].question}
              </h4>
            </div>
            <div className="option">
              {questions[nextQ].options.map((el, i) => {
                let bgColor = "";
                if (selected !== null) {
                  if (i === questions[nextQ].answerIndex) {
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
          <div className=" next-bt">
            <button onClick={handleBt}>Next</button>
          </div>
        </>
      )}
    </section>
  );
}

function Sample() {
  return;
}
