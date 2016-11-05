import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import currency from './utils/Currency';
import Button from './ui/Button';

class NewUser extends Component {

  edit(id) {
    hashHistory.push('/row/' + id);
  }

  render() {
    return (
      <div className="row">
        <div className="row__details">
          <p className="row__description" >{ this.props.description }</p>
          <p className="row__value">{ currency.format(this.props.value) }</p>
        </div>
        <div className="row__edit">
          <Button type="edit" onClick={ this.edit.bind(this, this.props.rowId) }></Button>
        </div>
      </div>
    );
  }
}

export default NewUser;
