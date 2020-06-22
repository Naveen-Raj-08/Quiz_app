import React, { Component } from "react";
import QuizData from "./Components/Data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
      currentIndex: 0,
      options: [],
      score: 0,
    };
  }
  componentDidMount() {
    this.loadQuestion();
  }

  loadQuestion() {
    const { currentIndex } = this.state;
    this.setState(() => {
      return {
        question: QuizData[currentIndex].question,
        options: QuizData[currentIndex].options,
        answer: QuizData[currentIndex].answer,
      };
    });
  }
  goToNextQuestion() {
    this.setState({
      score: this.state.score + 1,
    });
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
    console.log(this.state.currentIndex);
  }
  checkAnswer(e) {
    if (e.value !== this.state.answer) {
      this.setState({
        answer: this.state.answer,
      });
    }
  }

  render() {
    const { question, options, answer, score } = this.state;
    {
      return (
        <div className="container-md">
          <h3>
            Your Score is <span className="badge badge-info">{score}</span>
            Points
          </h3>
          <h2>{question}</h2>
          <p>{answer}</p>
          <ul>
            {options.map((option) => (
              <p
                id="Answer"
                value="answer"
                onClick={() => console.log("Clicked..!")}
              >
                <li>{option}</li>
              </p>
            ))}
          </ul>

          <button onClick={() => this.goToNextQuestion()}>Next Question</button>
        </div>
      );
    }
  }
}
export default App;
