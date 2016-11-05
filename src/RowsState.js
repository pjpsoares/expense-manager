import { observable, computed, autorun, action, asMap, toJS } from 'mobx';
import persistence from './persistence/Persistence';

const ROWS_KEY = 'rows';
const ID_KEY = 'idRowsCount';

class RowsState {
  rows;
  idCount;

  constructor() {
    this.rows = observable(asMap(persistence.get(ROWS_KEY, {})));
    this.idCount = persistence.get(ID_KEY, 0);

    autorun(() => {
      persistence.put(ROWS_KEY, toJS(this.rows));
      persistence.put(ID_KEY, this.idCount);
    });
  }

  @action
  add(value, users, description) {
    this.idCount++;

    this.rows.set(
      this.idCount,
      {
        id: this.idCount,
        value,
        users,
        description,
        userValue: value / users.length
      }
    );
  }

  @action
  update(id, value, users, description) {
    this.rows.set(
      id,
      {
        id,
        value,
        users,
        description,
        userValue: value / users.length
      }
    );
  }

  @action
  remove(id) {
    this.rows.delete(id);
  }

  getRowById(id) {
    return this.rows.get(id);
  }

  @computed get userRows() {
    let userRows = {};

    this.rows.values().forEach(
      (row) => {
        row.users.forEach(
          (userId) => {
            let rowsForUser = userRows[userId];
            if (!rowsForUser) {
              userRows[userId] = {
                rows: [row],
                total: row.userValue
              };
            } else {
              rowsForUser.rows.push(row);
              rowsForUser.total += row.userValue;
            }
          }
        );
      }
    );

    return userRows;
  }

  @computed get total() {
    return this.rows.values().reduce(
      (result, current) => result + Number(current.value),
      0
    );
  }
}

export default RowsState;
