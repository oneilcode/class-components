import { Component } from 'react';

export default class ErrorButton extends Component {
  state = { shouldCrash: false };

  handleClick = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    if (this.state.shouldCrash) {
      throw new Error('Test crash from ErrorButton');
    }
    return (
      <button className="error-btn" onClick={this.handleClick}>
        Test Error
      </button>
    );
  }
}
