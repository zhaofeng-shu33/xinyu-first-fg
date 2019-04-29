import React, { Component } from 'react';
import Container from '@icedesign/container';
import { Button, Dialog, Input, Upload, Card } from '@alifd/next';
import {
  FormBinderWrapper,
  FormBinder,
  FormError,
} from '@icedesign/form-binder';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { passwordChange } from '../../../../api/user_backend';
import { userProfileRequest, userProfileSuccess, userProfileFailure, userProfileUpdate } from '../../../../store/userProfile/action';
import { userProfile } from '../../../../store/userProfile/action';
import { Message } from '@alifd/next';
import { injectIntl } from 'react-intl';
import { applyClass } from '../../../../api/class_apply';
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
@injectIntl
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
      },
      profile: {},
      isInitialized: false
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
  componentDidMount() {
    //check whether we need to update user profile
    if (this.props.profile && this.props.profile.up_to_date == false) {
      this.props.userProfile();
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.profile.user && props.profile.up_to_date && !state.isInitialized) {
      return { profile: props.profile, isInitialized: true }
    }
    else
      return {};
  }
  cancelClass(classId) {
    applyClass(classId).then(json => {
      if (typeof (json.lawyer) != 'undefined') {
        Message.success('取消认领班级成功');
        let original_data = this.state.profile.lawyer_classes.slice();
        let delete_item_index = 0;
        original_data.map((item, index) => {
          if (item.pk == classId) {
            delete_item_index = index;
          }
        })
        original_data.splice(delete_item_index, 1);
        this.setState({ profile: { lawyer_classes: original_data } });
        this.props.userProfileUpdate();
      }
      else if (json.detail) {
        Message.notice(json.detail);
      }
      else {
        Message.notice('取消认领班级失败');
      }
    }).catch(error => {
      Message.error('取消认领班级失败');
    })
  }
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
          <div style={styles.infoDetail}>{this.state.profile.law_firm}</div>
        </div>
        <div>
          {this.state.profile.lawyer_classes && this.state.profile.lawyer_classes.map((item, index) => {
            let date = new Date(item.start_time);
            let date_str = this.props.intl.formatDate(date);
            let time_str = this.props.intl.formatTime(date);
            let second_course_info = null;
            if (item.start_time_2) {
              let date_2 = new Date(item.start_time_2);
              let date_str_2 = this.props.intl.formatDate(date_2);
              let time_str_2 = this.props.intl.formatTime(date_2);
              let date_time_str_2 = date_str_2 + ' ' + time_str_2;
              second_course_info = <p style={styles.desc}>{item.course_2}<span>上课时间：</span>{date_time_str_2}</p>
            }
            let class_name = item.grade + '年级' + item.class_id + '班';
            let apply_class_info = <Button onClick={() => { this.cancelClass(item.pk) }}>取消认领</Button>;              
            return (
              <Card key={index} title={item.school} extra={class_name}>
                <div>
                  <p style={styles.desc}>{item.course}<span>上课时间：</span>{date_str + ' ' + time_str}</p>
                  {second_course_info}
                </div>
                <div style={styles.footer}>
                  <div style={styles.link}>
                    <Button> 课程介绍</Button>
                  </div>
                  <div style={styles.link}>
                    {apply_class_info}
                  </div>
                </div>
              </Card>
            );
          })}
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
  userProfileUpdate,
  userProfile
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
  desc: {
    fontSize: '14px',
    color: '#697b8c',
    margin: '12px 0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    width: '50%',
    textAlign: 'center',
  },
};
