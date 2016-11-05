import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { hashHistory } from 'react-router';
import { userState } from './Store.js';
import Button from './ui/Button';

@observer
class NewUser extends Component {
  addUser() {
    const newName = this.refs.nameInput.value.trim();
    if (!newName.length) {
      return;
    }

    userState.add(newName);
    this.goToHome();
  }

  goToHome() {
    hashHistory.push('/');
  }

  handleNameInputKey(evt) {
    if (evt.key === 'Enter') {
      this.addUser();
    }
  }

  render() {
    return (
      <div>
        <h1>New User</h1>
        <span>Name: </span><input onKeyPress={this.handleNameInputKey.bind(this)} ref="nameInput" type="text"></input>
        <div className="action-panel">
          <Button type="confirm" onClick={this.addUser.bind(this)} ></Button>
          <Button type="cancel" onClick={this.goToHome.bind(this)} ></Button>
        </div>
      </div>
    );
  }
}

export default NewUser;
