import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.getPlayers();
  }

  getPlayers = () => {
    const oldArr = JSON.parse(localStorage.getItem('ranking')) || [];
    const newArr = oldArr.sort((a, b) => (b.score - a.score));
    this.setState({
      players: newArr,
    });
  };

  render() {
    const { players } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {players.map((e, index) => (
          <div key={ index }>
            <img src={ `https://www.gravatar.com/avatar/${md5(e.email).toString()}` } alt={ e.name } />
            <h2 data-testid={ `player-name-${index}` }>{e.name}</h2>
            <h2 data-testid={ `player-score-${index}` }>{e.score}</h2>
          </div>

        ))}
        <button
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
          } }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {}.isRequired;

export default Ranking;
