import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Navigation from './Navigation';

@observer
class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
