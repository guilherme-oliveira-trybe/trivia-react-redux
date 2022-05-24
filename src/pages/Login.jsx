import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';

class Login extends React.Component {
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

  sendPlayer() {
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
      </div>
    );
  }
}

// Login.propTypes = {
// };

// const mapDispatchToProps = (dispatch) => ({
// });

export default connect(null, null)(Login);
