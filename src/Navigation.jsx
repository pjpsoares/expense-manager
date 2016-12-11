import React, { Component } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul className="menu">
          <li className="menu-entry">
            <Link activeClassName="active" to="/">
              <i className="fa fa-file-text menu-entry-icon" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="menu-entry">
            <Link activeClassName="active" to="/row">
              <i className="fa fa-dollar menu-entry-icon" aria-hidden="true"></i>
            </Link>
          </li>
          <li className="menu-entry">
            <Link activeClassName="active" to="/user/add">
              <i className="fa fa-users menu-entry-icon" aria-hidden="true"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
