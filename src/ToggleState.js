import { observable, autorun, asMap, toJS, action } from 'mobx';
import persistence from './persistence/Persistence';

const TOGGLE_KEY = 'toggled';

class RowsState {
  openUsers;

  constructor() {
    this.openUsers = observable(asMap(persistence.get(TOGGLE_KEY, {})));

    autorun(() => {
      persistence.put(TOGGLE_KEY, toJS(this.openUsers));
    });
  }

  @action
  toggle(id) {
    if (this.openUsers.has(id)) {
      this.openUsers.delete(id);
    } else {
      this.openUsers.set(id, true);
    }
  }

  isOpen(id) {
    return this.openUsers.get(id);
  }
}

export default RowsState;
