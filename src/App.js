import React, { Component } from "react";
import QuizData from "./Components/Data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
      currentIndex: 0,
      options: [],
      score: 5,
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
    if (this.state.currentIndex === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
      });
      this.setState({
        currentIndex: this.state.currentIndex + 1,
      });
    }
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
        <div className="container">
          <h3>
            Your Score is <span className="badge badge-info">{score}</span>
            Points
          </h3>
          <h2>{question}</h2>
          <p>{answer}</p>
          <ul>
            {options.map((option) => (
              <p value="answer" onClick={this.checkAnswer}>
                <li>{option}</li>
              </p>
            ))}
          </ul>
        </div>
      );
    }
  }
}
export default App;
