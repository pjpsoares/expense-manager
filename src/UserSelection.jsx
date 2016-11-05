import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { userState } from './Store.js';

@observer
export default class Users extends Component {

  componentWillMount() {
    this.setState({
      users: this.props.users || []
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users || []
    });
  }

  checkUser(userId) {
    this.refs['user-' + userId].checked = !this.refs['user-' + userId].checked;
  }

  getValue() {
    return userState.users
      .map(user => user.id)
      .filter(userId => this.refs['user-' + userId].checked);
  }

  toggleCheckbox(userId) {
    const { users } = this.state;
    const indexOfUser = users.indexOf(userId);

    if (indexOfUser > -1) {
      this.setState({
        users: [...users.slice(0, indexOfUser), ...users.slice(indexOfUser + 1)]
      });
    } else {
      this.setState({
        users: [...users, userId]
      })
    }
  }

  toggleAll() {
    if (this.state.users.length === userState.users.length) {
      this.setState({
        users: []
      });
    } else {
      this.setState({
        users: userState.users.map(user => user.id)
      });
    }
  }

  render() {
    const { users } = this.state;
    const isAllChecked = users.length === userState.users.length;

    return (
      <div>
        <div>
          <input className="checkbox-input" id="all" type='checkbox' checked={ isAllChecked } onChange={ this.toggleAll.bind(this) } />
          <label className="checkbox-label" htmlFor="all" onClick={ this.toggleAll.bind(this) } >All</label>
        </div>
        {
          userState.users.map(( { id, name } ) =>
            <div className="checkbox-container" key={id} >
              <input className="checkbox-input" type='checkbox' id={'user-' + id} ref={ 'user-' + id } checked={ users.indexOf(id) > -1 } onChange={ this.toggleCheckbox.bind(this, id) }/>
              <label className="checkbox-label" htmlFor={'user-' + id} >
                { name }
              </label>
            </div>
          )
        }
      </div>
    );
  }
}
