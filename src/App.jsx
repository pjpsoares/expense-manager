import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
