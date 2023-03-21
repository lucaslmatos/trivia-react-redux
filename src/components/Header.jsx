import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    imgUser: '',
  };

  componentDidMount() {
    this.userImg();
  }

  userImg = async () => {
    const { email } = this.props;
    const converted = md5(email).toString();
    this.setState({
      imgUser: converted,
    });
  };

  render() {
    const { name, score } = this.props;
    const { imgUser } = this.state;
    return (
      <div>
        <h2 data-testid="header-player-name">{name}</h2>
        <h3 data-testid="header-score">{score}</h3>
        <img src={ `https://www.gravatar.com/avatar/${imgUser}` } alt="imgUser" data-testid="header-profile-picture" />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});
Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);

// Codigo criado por João Ricardo,Lucas Matos, Mauricio Fernandes
