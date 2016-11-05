import React, { Component } from 'react';

const baseClasses = 'button fa';
const typeToClass = {
  edit: 'fa-pencil-square-o',
  delete: 'fa-trash-o',
  cancel: 'fa-remove',
  confirm: 'fa-check'
}

class Button extends Component {
  render() {
    var classes = baseClasses + ' ' + typeToClass[this.props.type];

    return (
      <i className={ classes } aria-hidden="true" onClick={ this.props.onClick }></i>
    );
  }
}

export default Button;
