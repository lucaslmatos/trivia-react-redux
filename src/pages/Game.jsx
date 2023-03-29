import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions, shuffleArray } from '../helpers';
import { buttonDisable } from '../redux/actions';

const tres = 3;
let countDown;

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  componentDidMount() {
    this.getData();
    const duration = 30;
    this.startTimer(duration);
  }

  handleClick = () => {
    const { index } = this.state;
    const { dispatch, history } = this.props;
    this.setState({
      index: index + 1,
    });
    const quatro = 4;
    if (index >= quatro) {
      history.push('/feedback');
    }
    dispatch(buttonDisable(false));
    clearInterval(countDown);
    const duration = 30;
    this.startTimer(duration);
    const wrongs = document.getElementsByName('wrong');
    wrongs.forEach((e) => {
      e.style.border = '';
    });
    const correct = document.getElementsByName('certa');
    correct[0].style.border = '';
  };

  startTimer = (duration) => {
    const { dispatch } = this.props;
    let timer = duration;
    let minutes;
    let seconds;
    const min = 60;
    const parse = 10;
    const sec = 1000;
    const display = document.getElementById('timer');
    countDown = setInterval(() => {
      minutes = parseInt(timer / min, parse);
      seconds = parseInt(timer % min, parse);
      minutes = minutes < parse ? `0${minutes}` : minutes;
      seconds = seconds < parse ? `0${seconds}` : seconds;
      display.textContent = `${minutes}:${seconds}`;
      timer -= 1;
      if (timer < 0) {
        const wrongs = document.getElementsByName('wrong');
        wrongs.forEach((e) => {
          e.style.border = '3px solid red';
        });
        const correct = document.getElementsByName('certa');
        correct[0].style.border = '3px solid rgb(6, 240, 15)';
        dispatch(buttonDisable(true));
        clearInterval(countDown);
      }
    }, sec);
  };

  getData = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await (getQuestions(token));
    this.setState({
      questions: data.results,
    }, () => {
      const { questions } = this.state;
      const a = shuffleArray(questions);
      this.setState({
        questions: a,
      });
    });
    if (data.response_code === tres) {
      history.push('/');
    }
  };

  render() {
    const { questions, index } = this.state;
    const { disable } = this.props;
    let a = '';
    if (questions.length > 0) {
      a = <Question question={ questions[index] } />;
    }
    return (
      <div>
        <Header />
        {a}
        {disable
          && <button data-testid="btn-next" onClick={ this.handleClick }>Next</button>}
        <div id="timer" data-testid="timer"> </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  disable: state.game.disable,
});

Game.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Game);

// Codigo criado por João Ricardo,Lucas Matos, Mauricio Fernandes
