import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import profileReducer from '../../store/userProfile/reducer';
import logoutReducer from '../../store/userLogout/reducer';
import {deviceReducer, setMobile} from '../../store/device';
import { userProfile } from '../../store/userProfile/action';
import { userLogout } from '../../store/userLogout/action';

const BasicLayoutHoc = (WrappedComponent) => {
  class Container extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      this.props.userProfile();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = {
    userProfile,
    userLogout,
    setMobile
  };

  const mapStateToProps = (state) => {
    return { profile: state.profile, logout: state.logout };
  };

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  const withProfileReducer = injectReducer({
    key: 'profile',
    reducer: profileReducer,
  });

  const withLogoutReducer = injectReducer({
    key: 'logout',
    reducer: logoutReducer,
  });
  const withDeviceReducer = injectReducer({
    key: 'device',
    reducer: deviceReducer,
  });
  return compose(
    withProfileReducer,
    withLogoutReducer,
    withDeviceReducer,
    withConnect
  )(Container);
};

export default BasicLayoutHoc;
