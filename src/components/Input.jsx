import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, id, data, className } = this.props;
    return (
      <label htmlFor={ id } className="login-input-label">
        { label }
        <input
          data-testid={ data }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ id }
          className={ className }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  id: '',
  onChange: null,
};

export default Input;
