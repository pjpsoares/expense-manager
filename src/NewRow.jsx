import React, { Component } from 'react';
import UserSelection from './UserSelection';
import { hashHistory } from 'react-router';
import { observer } from 'mobx-react';
import Button from './ui/Button';
import { rowsState } from './Store.js';

@observer
class NewRow extends Component {

  componentWillMount() {
    this.updateStateWithId(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStateWithId(nextProps.params.id);
  }

  updateStateWithId(rowId) {
    const row = rowId && rowsState.getRowById(rowId);
    this.setState({
      value: row ? row.value : '',
      users: row && row.users || [],
      description: row && row.description || ''
    });
  }

  handleValueChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  createRow(value, users, description) {
    rowsState.add(value, users, description);
  }

  updateRow(id, value, users, description) {
    rowsState.update(id, value, users, description);
  }

  saveRow() {
    const users = this.refs.userSelection.getValue();
    const description = this.refs.descriptionInput.value.trim();
    const { operation } = this.state;
    var value = this.refs.valueInput.value.trim();

    if (!value.length || !users.length) {
      return;
    }

    value = Math.abs(this.refs.valueInput.value.trim());
    if (operation === 'minus') {
      value = value * -1;
    }

    if (this.props.params.id) {
      this.updateRow(this.props.params.id, value, users, description);
    } else {
      this.createRow(value, users, description);
    }

    this.goToHome();
  }

  removeRow() {
    rowsState.remove(this.props.params.id);

    this.goToHome();
  }

  goToHome() {
    hashHistory.push('/');
  }

  plus() {
    this.setState({
      operation: 'plus'
    });
  }

  minus() {
    this.setState({
      operation: 'minus'
    });
  }

  render() {
    const { description, users, value, operation } = this.state;
    const signalBaseClass = 'fa signal-selector';
    var signalPlusClass = signalBaseClass + ' fa-plus-circle signal-selector-plus';
    var signalMinusClass = signalBaseClass + ' fa-minus-circle signal-selector-minus';

    if (operation === 'minus') {
      signalMinusClass += ' selected';
    } else {
      signalPlusClass += ' selected';
    }

    return (
      <div>
        <div>
          <i className={ signalPlusClass } aria-hidden="true" onClick={ this.plus.bind(this) }></i>
          <i className={ signalMinusClass } aria-hidden="true" onClick={ this.minus.bind(this) }></i>
        </div>
        <div>
          <span>Value: </span><input ref="valueInput" type="number" value={ value } onChange={ this.handleValueChange.bind(this) }></input>
        </div>
        <div>
          <span>Description: </span><input ref="descriptionInput" type="text" value={ description } onChange={ this.handleDescriptionChange.bind(this) }></input>
        </div>
        <UserSelection users={ users } ref="userSelection"></UserSelection>
        <div className="action-panel">
          <Button type="confirm" onClick={ this.saveRow.bind(this) }></Button>
          <Button type="cancel" onClick={ this.goToHome.bind(this) }></Button>
          {
            this.props.params.id ? <Button type="delete" onClick={ this.removeRow.bind(this) }></Button> : undefined
          }
        </div>
      </div>
    );
  }
}

export default NewRow;
