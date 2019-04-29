/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IceContainer from '@icedesign/container';
import { Input, Radio, Switch, Upload, Grid, Form, Select } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { userProfile } from '../../../../store/userProfile/action';
const { Row, Col } = Grid;
const { Group: RadioGroup } = Radio;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 6, s: 3, l: 3 },
  wrapperCol: { s: 12, l: 10 },
};

function beforeUpload(info) {
  console.log('beforeUpload callback : ', info);
}

function onChange(info) {
  console.log('onChane callback : ', info);
}

function onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}

function onError(file) {
  console.log('onError callback : ', file);
}

class SettingsForm extends Component {
  static displayName = 'SettingsForm';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',          
        email: '',
        law_firm: '',
      },
      isInitialized: false
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  validateAllFormField = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
      this.props.userProfile({
        law_firm: values.law_firm,
        user: {
          username: values.username,
          email: values.email,
        }
      });
    } else {
      // 处理表单报错
    }
  };
  static getDerivedStateFromProps(props, state) {
    let user = props.profile.user;
    if (user && !state.isInitialized) {
      let username = user.username;
      let email = user.email;
      let law_firm = props.profile.law_firm ? props.profile.law_firm : '';
      return { value: { username, email, law_firm }, isInitialized: true }
    }
    else
      return null;
  }
  render() {

    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div className="settings-form">
        <IceContainer>
          <Form value={this.state.value} onChange={this.formChange} ref="form">
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>
                <FormattedMessage id="app.setting.pagetitle" />
              </h2>

              <FormItem
                label={formatMessage({ id: 'app.setting.name' })}
                {...formItemLayout}
                required
                maxLength={12}
                requiredMessage={formatMessage({
                  id: 'app.setting.name.message',
                })}
              >
                <Input name="username" placeholder="taoxiaobao"/>
              </FormItem>

              <FormItem
                label={formatMessage({ id: 'app.setting.email' })}
                {...formItemLayout}
                required
                requiredMessage={formatMessage({
                  id: 'app.setting.email.message',
                })}
              >
                <Input htmlType="email" name="email" />
              </FormItem>
              <FormItem
                label={formatMessage({ id: 'app.setting.law_firm' })}
                {...formItemLayout}
                required
                requiredMessage={formatMessage({
                  id: 'app.setting.law_firm',
                })}
              >
                <Select name="law_firm">
                  <Select.Option value="广东广和律师事务所">广东广和律师事务所</Select.Option>
                  <Select.Option value="维德法律服务中心">维德法律服务中心</Select.Option>
                  <Select.Option value="广东中矩律师事务所">广东中矩律师事务所</Select.Option>
                </Select>

              </FormItem>

              <Row style={{ marginTop: 20 }}>
                <Col offset="3">
                  <Form.Submit
                    type="primary"
                    style={{ width: 100 }}
                    validate
                    onClick={this.validateAllFormField}
                  >
                    <FormattedMessage id="app.setting.submit" />
                  </Form.Submit>
                </Col>
              </Row>
            </div>
          </Form>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
const mapDispatchToProps = {
  userProfile,
};
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect
)(SettingsForm);

