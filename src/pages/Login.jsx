import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
    bttnDisabled: true,
  };

  validation = () => {
    const { name, email } = this.state;
    return name.length > 0 && email.length > 0;
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    }, () => {
      const validaty = this.validation();
      this.setState({
        bttnDisabled: !validaty,
      });
    });
  };

  render() {
    const { name, email, bttnDisabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <label>
          Nome
          <input
            id="name"
            type="text"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label>
          Email
          <input
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button disabled={ bttnDisabled } data-testid="btn-play">Play</button>
      </div>
    );
  }
}
