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
      quizEnd: false,
      disabled: true,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.loadQuestion();
    }, 1000);
  }

  componentDidUpdate() {
    const { currentIndex } = this.state;
    this.setState((prevState) => {
      if (prevState !== currentIndex) {
        console.log(currentIndex);
      }
    });
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

  render() {
    const { question, options, userAns } = this.state;
    {
      return (
        <div className="container">
          <h2>{question}</h2>
          <ul>
            {options.map((option, index) => (
              <p
                key={option.id}
                className={`${userAns === option ? "selecter" : null}`}
                onClick={() => this.checkAnswer(option)}
              >
                <li key={option.index}>{option}</li>
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
