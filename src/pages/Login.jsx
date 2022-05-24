import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import tokenToLocalStorage from '../services/localStorage';
import { player } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isPlayButtonDisabled: true,
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({ [name]: value }), () => this.validateForm());
  }

  validateForm = () => {
    const { email, name } = this.state;
    const number = 0;
    if (name.length > number && email.length > 0) {
      this.setState({
        isPlayButtonDisabled: false,
      });
    } else {
      this.setState({
        isPlayButtonDisabled: true,
      });
    }
  }

  sendPlayer = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    this.playerInfo();
    tokenToLocalStorage(data);
    history.push('/game');
  }

  playerInfo = () => {
    const { name, email } = this.state;
    const { dispatch } = this.props;

    dispatch(player({ name, email }));
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { isPlayButtonDisabled, name, email } = this.state;
    return (
      <div>
        <Input
          className=""
          data="input-player-name"
          label="Nome: "
          type="text"
          onChange={ this.handleChange }
          value={ name }
          name="name"
          required
        />
        <Input
          className=""
          data="input-gravatar-email"
          label="Email: "
          type="text"
          onChange={ this.handleChange }
          value={ email }
          name="email"
          required
        />
        <Button
          data="btn-play"
          className=""
          type="button"
          label="Play"
          onClick={ this.sendPlayer }
          disabled={ isPlayButtonDisabled }
        />
        <Button
          data="btn-settings"
          className=""
          type="button"
          label="Settings"
          onClick={ this.goToSettings }
          disabled={ false }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
