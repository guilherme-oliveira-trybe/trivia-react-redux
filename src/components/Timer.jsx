import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Timer.css';
import PropTypes from 'prop-types';
import { timer, disabled as diabledAction, disabledNextButton } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.idInterval = null;
  }

  componentDidMount() {
    const { loading } = this.props;
    if (!loading) {
      setTimeout(() => {
        this.startTimer();
      });
    }
  }

  componentDidUpdate() {
    const { stop } = this.props;
    if (stop) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  startTimer = () => {
    const milisegundos = 1000;
    const { dispatch } = this.props;
    this.idInterval = setInterval(() => {
      const { seconds } = this.props;
      if (seconds > 0) {
        dispatch(timer(seconds - 1));
      }
      if (seconds === 0) this.stopTimer();
    }, milisegundos);
  }

  stopTimer = () => {
    const { dispatch } = this.props;
    clearInterval(this.idInterval);
    dispatch(disabledNextButton(true));
    dispatch(diabledAction(true));
  }

  render() {
    const { seconds } = this.props;
    const secondsInString = seconds.toString();
    const tenSeconds = 10;
    return (
      <div className="timer">
        <span
          className={ seconds > tenSeconds ? 'timer-seconds' : 'timer-seconds-red' }
        >
          { secondsInString.length === 2 ? seconds : `0${seconds}` }
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func,
  stop: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  seconds: state.timer.timer,
});

export default connect(mapStateToProps)(Timer);
