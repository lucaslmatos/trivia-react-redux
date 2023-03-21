import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

const tres = 3;

class Feedback extends Component {
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
            dispatch(resetScore);
            history.push('/');
          } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => {
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
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
