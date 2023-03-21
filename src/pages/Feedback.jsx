import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

const tres = 3;

class Feedback extends Component {
  render() {
    const { corrects } = this.props;
    let feed = 'Could be better...';
    feed = +corrects >= tres ? 'Well Done!' : 'Could be better...';
    console.log(corrects);
    return (
      <>
        <Header />
        <h2
          data-testid="feedback-text"
        >
          {feed}
        </h2>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  corrects: state.player.corrects,
});

Feedback.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Feedback);
