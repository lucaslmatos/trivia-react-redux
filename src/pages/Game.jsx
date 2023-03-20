import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { getQuestions, shuffleArray } from '../helpers';
import { buttonDisable } from '../redux/actions';

const tres = 3;
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
    const { dispatch } = this.props;
    this.setState({
      index: index + 1,
    });
    dispatch(buttonDisable(false));
    const duration = 30;
    this.startTimer(duration);
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
    const countDown = setInterval(() => {
      minutes = parseInt(timer / min, parse);
      seconds = parseInt(timer % min, parse);
      minutes = minutes < parse ? `0${minutes}` : minutes;
      seconds = seconds < parse ? `0${seconds}` : seconds;
      display.textContent = `${minutes}:${seconds}`;
      timer -= 1;
      if (timer < 0) {
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
    let a = '';
    if (questions.length > 0) {
      a = <Question question={ questions[index] } />;
    }
    return (
      <div>
        <Header />
        {a}
        <button onClick={ this.handleClick }>Next</button>
        <div id="timer"> </div>
      </div>
    );
  }
}

Game.propTypes = {}.isRequired;

export default connect()(Game);

// Codigo criado por João Ricardo,Lucas Matos, Mauricio Fernandes
