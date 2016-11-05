import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { rowsState, userState } from './Store';
import Row from './Row';
import User from './User';
import Navigation from './Navigation';

@observer
class Home extends Component {

  renderUser( { id, name } ) {
    const userRows = rowsState.userRows[String(id)];
    const total = userRows ? userRows.total : '0';
    const rows = userRows ? userRows.rows : [];

    return (
        <User key={ id } name={ name } total={ total } userId={ id } rows={ rows } type="user"/>
    );
  }

  renderUsers() {
    return userState.users.map(this.renderUser);
  }

  renderAllRows() {
    return (
      <div className="user-rows">
        {
          rowsState.rows.values().map(
            (row, index) => <Row key={ index } value={ row.value } rowId={ row.id } description={ row.description } />
          )
        }
      </div>
    );
  }

  renderGlobal() {
    const rows = rowsState.rows.values();

    return (
      <User name="Balance" total={ rowsState.total } rows={ rows } userId="GLOBAL" type="global"/>
    );
  }

  render() {
    return (
      <div>
        <Navigation/>
        { this.renderGlobal() }
        { this.renderUsers() }
      </div>
    );
  }
}

export default Home;
