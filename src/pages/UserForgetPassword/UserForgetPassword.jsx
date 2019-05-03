import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Grid, Form } from '@alifd/next';
import { Message } from '@alifd/next';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { passwordResetRequest } from '../../api/user_backend';
import { connect } from 'react-redux';

const Icon = FoundationSymbol;
const { Row, Col } = Grid;
const FormItem = Form.Item;

const userLogin = (params) => {
  return async (dispatch) => {
    dispatch(userLoginRequest());
    const response = await login(params);

    dispatch(userLoginResult());

    if (response.status === 200) {
      setAuthority('user');
      reloadAuthorized();
      dispatch(push('/'));
    }
    return response;
  };
}
class UserForgetPassword extends Component {
  static displayName = 'UserForgetPassword';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: '',
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (values, errors) => {
    if (errors) {
      return;
    }
    passwordResetRequest(values.email).then((response)=>{
      if (response.status != 200) {
        Message.error(response.data.detail);
      }
      else {
        Message.success('重置密码的邮件已发送，请及时查收');
      }
    })
  };

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem required requiredMessage="请输入正确的邮箱" className="formItem">
              <Input
                innerBefore={
                  <Icon type="mail" size="small" className="inputIcon" />
                }
                name="email"
                maxLength={20}
                placeholder="邮箱"
              />
            </FormItem>
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                重置密码
              </Form.Submit>
            </Row>
            
            <Row className="tips">
              <Col span="12" className="tips-container">
                <Link to="/user/register" className="tips-text">
                  注册
              </Link>
              </Col>
              <Col span="12" className="tips-container">
                <Link to="/user/login" className="tips-text" >
                  登录
              </Link>
              </Col>             
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
};


const withConnect = connect(
  null,
  mapDispatchToProps
);


export default withConnect(UserForgetPassword);
