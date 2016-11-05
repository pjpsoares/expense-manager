import { observable, autorun, action } from 'mobx';
import persistence from './persistence/Persistence';

const USERS_KEY = 'users';
const ID_KEY = 'idUserCount';

class UsersState {
  users;
  idCount

  constructor() {
    this.users = observable(persistence.get(USERS_KEY, []));
    this.idCount = persistence.get(ID_KEY, 0);

    autorun(() => {
      persistence.put(USERS_KEY, this.users.toJS());
      persistence.put(ID_KEY, this.idCount);
    });
  }

  @action
  add(name) {
    this.users.push({
      name,
      id: ++this.idCount
    });
  }
}

export default UsersState;
