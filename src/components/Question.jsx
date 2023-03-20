import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shuffleArray } from '../helpers';

class Question extends Component {
  state = {
    answers: [],
  };

  componentDidMount() {
    this.getAnswers();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (question !== prevProps.question) {
      this.getAnswers();
    }
  }

  handleClick = () => {
    const wrongs = document.querySelectorAll('.wrong');
    wrongs.forEach((e) => {
      e.className = 'incorrect';
    });
    const correct = document.querySelector('.certa');
    correct.className = 'correct';
  };

  getAnswers = () => {
    const { question } = this.props;
    console.log(question);
    let arr = [];
    arr.push(question.correct_answer);
    arr = [...arr, ...question.incorrect_answers];
    const array = shuffleArray(arr);
    this.setState({
      answers: array,
    });
  };

  render() {
    const { question } = this.props;
    const { answers } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h3 data-testid="question-text">{question.question}</h3>
        <div data-testid="answer-options">
          {answers.map((e, index) => (
            <button
              onClick={ this.handleClick }
              key={ index }
              className={
                e === question.correct_answer ? 'certa'
                  : 'wrong'
              }
              data-testid={
                e === question.correct_answer ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
            >
              {e}
            </button>
          ))}
        </div>

      </div>
    );
  }
}
Question.propTypes = {
  question: PropTypes.string.isRequired,
};
export default Question;
