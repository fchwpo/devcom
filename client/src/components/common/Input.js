import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <input
        type="email"
        className="form-control form-control-lg"
        placeholder="Email Address"
        name="email"
        value={this.state.email}
        onChange={this.onInputChange}
      />
    );
  }
}

export default Input;
