import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timer, disabled as diabledAction } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    // this.state = {
    //   seconds: 30,
    // };

    this.idInterval = null;
  }

  componentDidMount() {
    const FIVE_SECONDS_IN_MILLESECONDS = 5000;
    setTimeout(() => {
      this.startTimer();
    }, FIVE_SECONDS_IN_MILLESECONDS);
  }

  componentDidUpdate() {
    // const { seconds } = this.state;
    const { stop } = this.props;
    if (stop) {
      this.stopTimer();
    }
    // dispatch(timer(seconds));
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  startTimer = () => {
    const milisegundos = 1000;
    const { dispatch } = this.props;
    this.idInterval = setInterval(() => {
      // this.setState((prevState) => ({
      //   seconds: prevState.seconds - 1,
      // }));
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
    dispatch(diabledAction(true));
  }

  render() {
    // const { seconds } = this.state;
    const { seconds } = this.props;
    const secondsInString = seconds.toString();

    return (
      <span>{ secondsInString.length === 2 ? seconds : `0${seconds}` }</span>
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

// export default connect()(Timer);
