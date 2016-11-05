import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserRows from './UserRows';
import currency from './utils/Currency';
import { toggleState } from './Store';

@observer
class User extends Component {

  render() {
    const { name, total, rows, userId, type } = this.props;
    const isOpen = toggleState.isOpen(userId);
    const toggleFunction = toggleState.toggle.bind(toggleState, userId);

    let iconClass = 'user-dropdown-icon fa';
    if (isOpen) {
      iconClass += ' fa-toggle-up';
    } else {
      iconClass += ' fa-toggle-down';
    }

    return (
      <div className="user-container">
        <div className="user-name-container" onClick={ toggleFunction } >
          <i className={ iconClass } aria-hidden="true"></i>
          <p className="user-name">{ name }</p>
          <p className="user-total">{ currency.format(total) } </p>
        </div>
        { isOpen && <UserRows rows={ rows } type={ type }></UserRows> }
      </div>
    );
  }
}

export default User;
