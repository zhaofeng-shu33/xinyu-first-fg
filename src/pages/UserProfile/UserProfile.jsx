import React, { Component } from 'react';
import AccountPanelBlock from './components/AccountPanelBlock';

export default class Setting extends Component {
  static displayName = 'User Profile';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AccountPanelBlock />
      </div>
    );
  }
}
