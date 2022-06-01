import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiVolumeFull, BiVolumeMute, BiSliderAlt } from 'react-icons/bi';
import Sound from 'react-sound';
import track01 from '../asserts/sounds/track-01.wav';
import { categories } from '../asserts/categories.json';
import { changeSettings, changeMusicVolume } from '../actions';
import './Settings.css';
import { historyType } from '../types';

class Settings extends Component {
  constructor() {
    super(); 
    this.state = {
      category: '',
      difficulty: '',
      type: '',
      volume: 60,
    };
  }

  saveSettings = () => {
    const { dispatch, history } = this.props;
    const { category, difficulty, type, volume } = this.state;
    console.log(volume);
    dispatch(changeSettings({ category, difficulty, type }));
    dispatch(changeMusicVolume(volume));
    history.push('/');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(target);
    this.setState(({ [name]: value }));
  }

  render() {
    const { volume } = this.state;
    return (
      <div className="settigs-container">
        <header className="settings-header">
          <BiSliderAlt />
          <h2 data-testid="settings-title">Settings</h2>
        </header>
        <div className="settigs-options">
          <select
            name="category"
            className="form-control"
            onClick={ this.handleChange }
          >
            {
              categories.map(({ value, category }, idx) => (
                <option key={ idx } value={ value }>{ category }</option>
              ))
            }
          </select>
          <select
            name="difficulty"
            className="form-control"
            onClick={ this.handleChange }
          >
            <option value="">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="type"
            className="form-control"
            onClick={ this.handleChange }
          >
            <option value="">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <fieldset className="volume">
            <legend>Music volume</legend>
            <div className="settings-volume">
              { volume !== '0' ? <BiVolumeFull className="volume-icon" />
                : <BiVolumeMute className="volume-icon-mute" /> }
              <input
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="100"
                value={ volume }
                onChange={ this.handleChange }
              />
              <span className="volume-percent">{`${volume}%`}</span>
            </div>
          </fieldset>
        </div>
        <button
          type="button"
          className="settings-btn-save"
          onClick={ this.saveSettings }
        >
          Save Settings
        </button>
        <Sound
          url={ track01 }
          playStatus="PLAYING"
          volume={ volume }
        />
      </div>
    );
  }
}

Settings.propTypes = {
  historyType,
}.isRequired;

export default connect(null)(Settings);
