import React, { Component } from "react";
import QuizData from "./Components/Data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAns: null,
      currentIndex: 0,
      options: [],
      score: 0,
      quizFinish: false,
      disabled: true,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.loadQuestion();
    }, 500);
  }

  shouldComponentUpdate() {
    return true;
  }

  // componentDidUpdate() {
  // const { currentIndex } = this.state;
  // this.setState((prevState) => {
  //  if (prevState !== currentIndex) {
  //  console.log(currentIndex);
  // }
  // });
  // }
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
    const { userAns, currentIndex, score, answer } = this.state;
    this.setState({
      currentIndex: currentIndex + 1,
    });

    if (userAns === answer) {
      this.setState({
        score: score + 1,
      });
    }
  }
  checkAnswer(answer) {
    this.setState({
      userAns: answer,
      disabled: false,
    });
  }
  quizFinish() {
    const { currentIndex, userAns, answer, score } = this.state;
    if (currentIndex === QuizData.length - 1) {
      this.setState({
        quizFinish: true,
      });
      if (userAns === answer && score === 4) {
        this.setState({
          score: score + 1,
        });
      }
    }
    if (score === 5) {
      alert(`Test is Over and You got ${this.state.score} Points`);
    }
  }
  render() {
    const {
      currentIndex,
      question,
      options,
      userAns,
      disabled,
      score,
    } = this.state;

    return (
      <div className="container">
        <h6>Question No: {currentIndex + 1}</h6>
        <p id="Score">
          Your Score is <span className="badge badge-success"> {score} </span>{" "}
          Points
        </p>
        <hr />
        <h2>{question}</h2>
        <ul>
          {options.map((option, index) => (
            <p
              id="options"
              key={option.id}
              className={`${userAns === option ? "selected" : null}`}
              onClick={() => this.checkAnswer(option)}
            >
              <li key={option.index}>{option}</li>
            </p>
          ))}
        </ul>
        {currentIndex < QuizData.length - 1 && (
          <button
            className="btn btn-secondary"
            disabled={disabled}
            onClick={() => this.goToNextQuestion()}
          >
            Next Question
          </button>
        )}
        {currentIndex === QuizData.length - 1 && (
          <button className="btn btn-primary" onClick={() => this.quizFinish()}>
            Finish
          </button>
        )}
      </div>
    );
  }
}
export default App;
