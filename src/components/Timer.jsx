import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timer, disabled } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };

    this.idInterval = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { dispatch } = this.props;
    if (seconds === 0) {
      this.stopTimer();
    }
    dispatch(timer(seconds));
  }

  startTimer = () => {
    const milisegundos = 1000;
    this.idInterval = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, milisegundos);
  }

  stopTimer = () => {
    const { dispatch } = this.props;
    clearInterval(this.idInterval);
    dispatch(disabled(true));
  }

  render() {
    const { seconds } = this.state;
    return (
      <span>{ seconds }</span>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Timer);
