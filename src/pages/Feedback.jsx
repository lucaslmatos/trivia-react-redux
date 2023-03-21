import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

const tres = 3;

class Feedback extends Component {
  componentDidMount() {
    const { name, assertions, email, score } = this.props;
    const user = {
      name,
      assertions,
      email,
      score,
    };
    const oldArr = JSON.parse(localStorage.getItem('ranking')) || [];
    oldArr.push(user);
    localStorage.setItem('ranking', JSON.stringify(oldArr));
  }

  render() {
    const { assertions, score, dispatch, history } = this.props;
    return (
      <>
        <Header />
        <h2
          data-testid="feedback-text"
        >
          {assertions >= tres ? 'Well Done!' : 'Could be better...'}
        </h2>
        <h2 data-testid="feedback-total-score">
          {+score}
        </h2>
        <h2 data-testid="feedback-total-question">{+assertions}</h2>
        <button
          onClick={ () => {
            dispatch(resetScore());
            history.push('/');
          } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => {
            dispatch(resetScore());
            history.push('/ranking');
          } }
        >
          Ranking

        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.email,
  name: state.player.name,

});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
