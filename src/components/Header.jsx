import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckMusicMute from './CheckMusicMute';

class Header extends Component {
  render() {
    const { score, name, picture, amount } = this.props;

    return (
      <header className="header-container">

        <div className="header-content">

          <div className="player-info">
            <img
              className="player-image"
              data-testid="header-profile-picture"
              src={ picture }
              alt="Imagem do Jogador"
            />
            <h3 data-testid="header-player-name">{name}</h3>
          </div>

          <span
            className="player-score"
            data-testid="header-score"
          >
            {`${score} pts`}
          </span>
          <div className="amout-questions">
            <p className="number-quetions">
              <span>{amount}</span>
              /5
            </p>
            <CheckMusicMute />
          </div>

        </div>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  picture: state.player.picture,
  amount: state.amountQuestions.amount,
});

export default connect(mapStateToProps)(Header);
