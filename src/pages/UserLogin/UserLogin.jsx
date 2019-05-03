/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FoundationSymbol from '@icedesign/foundation-symbol';
import { Input, Checkbox, Grid, Form } from '@alifd/next';
import { Message } from '@alifd/next';

import { connect } from 'react-redux';
import { userLogin } from './actions';

const Icon = FoundationSymbol;
const { Row, Col } = Grid;
const FormItem = Form.Item;

class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
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
                  <Icon type="person" size="small" className="inputIcon" />
                }
                name="username"
                maxLength={20}
                placeholder="用户名"
              />
            </FormItem>
            <FormItem required requiredMessage="必填" className="formItem">
              <Input
                innerBefore={
                  <Icon type="lock" size="small" className="inputIcon" />
                }
                name="password"
                htmlType="password"
                placeholder="密码"
              />
            </FormItem>
            <FormItem>
              <Checkbox name="checkbox" className="checkbox">
                记住账号
              </Checkbox>
            </FormItem>
            <Row className="formItem">
              <Form.Submit
                type="primary"
                validate
                onClick={this.handleSubmit}
                className="submitBtn"
              >
                登 录
              </Form.Submit>
            </Row>

            <Row className="tips">
              <Col span="12" className="tips-container">
                <Link to="/user/register" className="tips-text">
                立即注册
              </Link>
              </Col>
              <Col span="12" className="tips-container">
                <Link to="/user/resetpassword" className="tips-text" >
                重置密码
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


export default withConnect(UserLogin);
