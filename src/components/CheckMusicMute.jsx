import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi';
import { connect } from 'react-redux';
import { changeMusicVolume } from '../actions';
import './CheckMusicMute.css';

class CheckMusicMute extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  handleChange = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }), () => this.dispatchMusicVolume());
  }

  dispatchMusicVolume = () => {
    const { checked } = this.state;
    const { dispatch } = this.props;
    const standardVolume = 60;
    const muteVolume = 0;
    if (checked === true) {
      dispatch(changeMusicVolume(muteVolume));
    } else {
      dispatch(changeMusicVolume(standardVolume));
    }
  }

  render() {
    const { checked } = this.state;
    return (
      <button
        className="btn-mute"
        type="button"
        onClick={ this.handleChange }
      >
        { !checked ? <BiVolumeMute /> : <BiVolumeFull />}
      </button>
    );
  }
}

CheckMusicMute.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null)(CheckMusicMute);
