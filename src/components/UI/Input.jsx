import React, { Component } from 'react';

export default class Input extends Component {
  render() {

    return (
      
      <div className="wrap-input100 validate-input m-b-20" data-validate="Enter password">
    <input onChange={this.props.inputChanged} placeholder={this.props.placeholder} className="input100" id={this.props.id} value={this.props.value} required={this.props.required} type={this.type} name={this.name} />
    <span className="focus-input100"></span>    
    </div>

    );
  }
}
