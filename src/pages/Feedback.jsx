import React from "react";

class Feedback extends React.Component {
  constructor() {
    super();

    this.verifyStatusAcertos = this.verifyStatusAcertos.bind(this);
    this.stateMessage = this.stateMessage.bind(this);

    this.state = {
      statusAcertos: 3,
      messageFeedaback: '',
    }
  }

  componentDidMount() {
    this.verifyStatusAcertos();
  }

  stateMessage(message) {
    this.setState({
      messageFeedaback: message,
    });
  }

  verifyStatusAcertos() {
    const { statusAcertos } = this.state;
    const QUANTITY_ACERTOS = 3;
    if (statusAcertos >= 0 || statusAcertos < QUANTITY_ACERTOS) {
      return this.stateMessage('Could be better...');
    } else if (statusAcertos >= QUANTITY_ACERTOS) {
      return this.stateMessage('Well Done!');
    }
  }

  render() {
    const { messageFeedaback } = this.state;
    return (
      <div>
        <strong data-testid="feedback-text">{messageFeedaback}</strong>
      </div>
    )
  }
}

export default Feedback;