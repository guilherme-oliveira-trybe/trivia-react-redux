import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, onClick, disabled, data, className, icon } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ data }
        className={ className }
      >
        { icon }
        { label }
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  data: PropTypes.string,
  className: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

Button.defaultProps = {
  data: '',
};
