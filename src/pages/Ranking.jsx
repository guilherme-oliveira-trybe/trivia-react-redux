import React, { Component } from 'react';
import './Ranking.css';
import { connect } from 'react-redux';
import { BiBarChartAlt2, BiMedal, BiLogOutCircle } from 'react-icons/bi';
import { newPlayer, resetAmount } from '../actions';
import { historyType } from '../types';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const rankingLocalState = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        ranking: rankingLocalState.sort((a, b) => b.score - a.score),
      });
    }
  }

  goToLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(newPlayer());
    dispatch(resetAmount());
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    const thirdPosition = 3;
    return (
      <div className="ranking">
        <header className="ranking-header">
          <BiBarChartAlt2 />
          <h2 data-testid="ranking-title">Ranking</h2>
        </header>

        <div className="ranking-container">
          <div className="ranking-players">
            {ranking.map((player, index) => (
              <div
                key={ index }
                className="ranking-player"
              >
                <span className="ranking-player-card-position">{`${index + 1}º`}</span>

                <div
                  className={ (index + 1) <= thirdPosition
                    ? 'ranking-player-card' : 'ranking-player-card-low-positions' }
                >
                  <img
                    className="player-image"
                    src={ player.picture }
                    alt={ player.name }
                  />
                  <h2 data-testid={ `player-name-${index}` }>{ player.name }</h2>
                  <h2 data-testid={ `player-score-${index}` }>{ `${player.score}pts` }</h2>
                  { index < thirdPosition && <BiMedal className="medal" /> }
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="button-container">
          <div className="button-content">
            <button
              type="button"
              data-testid="btn-go-home"
              className="ranking-btn-home"
              onClick={ this.goToLogin }
            >
              <BiLogOutCircle />
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  historyType,
}.isRequired;

export default connect()(Ranking);
