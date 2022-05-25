import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  goToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
