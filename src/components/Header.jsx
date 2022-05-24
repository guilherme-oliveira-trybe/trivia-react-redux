import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  gravatarImg = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    console.log(hash);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ this.gravatarImg() }
          alt="Imagem do Joagador"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
