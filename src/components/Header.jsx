import React, { Component } from 'react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      score: '',
      picture: '',
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('ranking'))) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      this.setState({
        name: ranking[0].name,
        score: ranking[0].score,
        picture: ranking[0].picture,
      });
    }
  }

  render() {
    const { name, score, picture } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ picture }
          alt="Imagem do Jogador"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

export default Header;
