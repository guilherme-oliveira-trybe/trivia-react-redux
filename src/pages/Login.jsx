import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { BiPlay, BiSliderAlt } from 'react-icons/bi';
import md5 from 'crypto-js/md5';
import triviaImage from '../asserts/trivia.png';
import Input from '../components/Input';
import Button from '../components/Button';
import { tokenToLocalStorage } from '../services/localStorage';
import { player } from '../actions';
import { fetchToken } from '../services/apiTrivia';
import { historyType } from '../types';

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
    this.playerInfoDispatch();
    await this.allInfoToStorage();
    history.push('/game');
  }

  allInfoToStorage = async () => {
    const token = await fetchToken();
    tokenToLocalStorage(token);
  }

  gravatarImg = () => {
    const { email } = this.state;
    const hash = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  }

  playerInfoDispatch = () => {
    const { name, email } = this.state;
    const { dispatch } = this.props;
    const picture = this.gravatarImg();

    dispatch(player({ name, email, picture }));
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { isPlayButtonDisabled, name, email } = this.state;
    return (
      <div className="login-container">
        <div className="login">
          <div className="logo-img-container">
            <img src={ triviaImage } alt="trivia logo" />
          </div>
          <Input
            data="input-player-name"
            label="Nome: "
            type="text"
            onChange={ this.handleChange }
            value={ name }
            name="name"
            id="nameInput"
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
            id="emailInput"
            required
          />
          <Button
            data="btn-play"
            className="login-btn-play"
            type="button"
            icon={
              <BiPlay className="" />
            }
            label="Play"
            onClick={ this.sendPlayer }
            disabled={ isPlayButtonDisabled }
          />
          <Button
            data="btn-settings"
            className="login-btn-settings"
            icon={
              <BiSliderAlt />
            }
            type="button"
            label="Settings"
            onClick={ this.goToSettings }
            disabled={ false }
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: historyType,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Login);
