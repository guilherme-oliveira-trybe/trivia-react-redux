import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newPlayer } from '../actions';

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
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToLogin }
        >
          Home
        </button>
        {ranking.map((player, index) => (
          <div key={ index }>
            <img src={ player.picture } alt={ player.name } />
            <h2 data-testid={ `player-name-${index}` }>{ player.name }</h2>
            <h2 data-testid={ `player-score-${index}` }>{ player.score }</h2>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
