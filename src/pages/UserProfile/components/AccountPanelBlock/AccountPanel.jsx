import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Button, Dialog, Input, Upload } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { passwordChange } from '../../../../api/user_backend';
import { userProfileRequest, userProfileSuccess, userProfileFailure } from '../../../../store/userProfile/action';
import { Message } from '@alifd/next';
const userPassword = (params) => {
  return async (dispatch) => {
    dispatch(userProfileRequest());
    try {
      let response = {};
      response = await passwordChange(params);
      if (response.status == 200) {
        Message.success('更新密码成功');
        dispatch(userProfileSuccess());
      }
      else {
        Message.success('更新密码失败');
        dispatch(userProfileFailure());
      }
    } catch (error) {
      dispatch(userProfileFailure(error));
    }
  };
};
class AccountPanel extends Component {
  static displayName = 'AccountPanel';

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: {
        old_password: '',
        new_password1: '',
        new_password2: ''
      }
    };
  }

  handleOpenEditPanel = () => {
    this.setState({ open: true });
  };

  handleCloseEditPanel = () => {
    this.setState({ open: false });
  };
  submitEdit = (value) => {
    this.props.userPassword(this.state.value);
    this.setState({ open: false });
  };
  formChange = (value) => {
    console.log(value);
  };
  render() {
    let user = this.props.profile.user;
    let username = '';
    let email = '';
    if (user) {
      username = user.username;
      email = user.email;
    }
    return (
      <Container>
        <div style={styles.header}>
          <h2 style={styles.title}>账号信息</h2>
          <div>
            <Button type="secondary"><Link to="setting">修改信息</Link>
            </Button>
            <Button onClick={this.handleOpenEditPanel} type="primary">
              修改密码
            </Button>
          </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号类型</div>
          <div style={styles.infoDetail}>律师</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>用户名</div>
          <div style={styles.infoDetail}>{username}</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>邮箱</div>
          <div style={styles.infoDetail}>{email}</div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>账号头像</div>
          <div style={styles.infoDetail}>
            <img src={require('./images/avatar.jpg')} style={{ width: 120 }} />
          </div>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.infoLabel}>律所</div>
          <div style={styles.infoDetail}>{this.props.profile.law_firm}</div>
        </div>
        <Dialog
          visible={this.state.open}
          onOk={this.submitEdit}
          onClose={this.handleCloseEditPanel}
          onCancel={this.handleCloseEditPanel}
          title="修改账户信息"
        >
          <FormBinderWrapper
            value={this.state.value}
            onChange={this.formChange}
          >
            <div>
              <div style={styles.fromItem}>
                <span>旧密码：</span>
                <FormBinder name="old_password" required max={20} message="不能为空">
                  <Input htmlType="password" />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="new_password1" />
              <div style={styles.fromItem}>
                <span>新密码：</span>
                <FormBinder name="new_password1" required max={20} message="不能为空">
                  <Input htmlType="password"/>
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="new_password2" />
              <div style={styles.fromItem}>
                <span>重复新密码：</span>
                <FormBinder name="new_password2" required max={20} message="不能为空">
                  <Input htmlType="password"
                  />
                </FormBinder>
              </div>
              <FormError style={{ marginLeft: 10 }} name="desc" />
            </div>
          </FormBinderWrapper>
        </Dialog>
      </Container>
    );
  }
}
const mapDispatchToProps = {
  userPassword,
};

const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(AccountPanel);

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    margin: 0,
    paddingBottom: 20,
  },
  infoRow: {
    padding: '16px 0',
    display: 'flex',
    borderBottom: '1px solid #f6f6f6',
  },
  infoLabel: {
    flex: '0 0 100px',
    color: '#999',
  },
  infoDetail: {},

  fromItem: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
};
