import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
          <img src={require('./logo.png')} className="logo-image"/>
      </div>
    );
  }
}
