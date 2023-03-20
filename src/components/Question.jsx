import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].className = '';
    }
  }

  handleClick = () => {
    const wrongs = document.getElementsByName('wrong');
    wrongs.forEach((e) => {
      e.className = 'incorrect';
    });
    const correct = document.getElementsByName('certa');
    correct[0].className = 'correct';
  };

  getAnswers = () => {
    const { question } = this.props;
    let arr = [];
    arr.push(question.correct_answer);
    arr = [...arr, ...question.incorrect_answers];
    const array = shuffleArray(arr);
    this.setState({
      answers: array,
    });
  };

  render() {
    const { question, disable } = this.props;
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
              disabled={ disable }
              name={
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

const mapStateToProps = (state) => ({
  disable: state.game.disable,
});

Question.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Question);
