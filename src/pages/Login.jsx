import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { getTokenApi } from '../helpers';
import { addUser, resetScore } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    bttnDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetScore());
  }

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

  handleClick = async ({ target }) => {
    const { history } = this.props;
    if (target.name === 'settings') {
      history.push('settings');
    } else {
      const { name, email } = this.state;
      const { dispatch } = this.props;
      dispatch(addUser(email, name));
      const token = await getTokenApi();
      localStorage.setItem('token', token.token);
      history.push('/game');
    }
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
        <button
          disabled={ bttnDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          name="settings"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {}.isRequired;

export default connect()(Login);

// Codigo criado por João Ricardo,Lucas Matos, Mauricio Fernandes
