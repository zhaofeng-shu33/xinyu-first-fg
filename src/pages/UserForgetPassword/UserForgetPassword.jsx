import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Checkbox, Grid, Form } from '@alifd/next';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';


const Icon = FoundationSymbol;
const { Row } = Grid;
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
    this.props.userLogin(values).then((response)=>{
      if(response.status != 200){
        Message.error(response.statusText);
      }
      Message.success('登录成功');
    })
  };

  render() {
    return (
      <div className="user-login">
        <div className="formContainer">
          <Form value={this.state.value} onChange={this.formChange}>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="email" size="small" className="inputIcon" />
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
              <Link to="/user/register" className="tips-text">
                注册
              </Link>
              <Link to="/user/login" className="tips-text">
                登录
              </Link>
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
