import React, { Component } from 'react';
import Row from './Row';

class UserRows extends Component {
  getValue(row) {
    const { type } = this.props;

    if ( type === 'global') {
      return row.value;
    } else {
      return row.userValue;
    }
  }

  render() {
    const { rows } = this.props;
    const getValue = this.getValue.bind(this);

    return (
      <div className="user-rows">
        {
          rows.map(
            (row, index) => <Row key={ index } value={ getValue(row) } rowId={ row.id } description={ row.description }/>
          )
        }
      </div>
    );
  }
}

export default UserRows;
