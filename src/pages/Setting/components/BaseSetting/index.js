/* eslint  react/no-string-refs: 0 */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import IceContainer from '@icedesign/container';
import { Input, Radio, Switch, Upload, Grid, Form, Select } from '@alifd/next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { userProfile } from '../../../../store/userProfile/action';
import { getOffice } from '../../../../api/lawyer';
const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xxs: 6, s: 3, l: 3 },
  wrapperCol: { s: 12, l: 10 },
};

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
        office_id: 1, //store office_id        
      },
      isInitialized: false,
      office_list: []
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };
  componentDidMount() {
    getOffice().then((json) => {
      this.setState({ office_list: json });
    })
  }
  validateAllFormField = (values, errors) => {
    console.log('error', errors, 'value', values);
    if (!errors) {
      // 提交当前填写的数据
      this.props.userProfile({
        office: this.state.office_list[values.office_id-1],
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
      let office = props.profile.office ? props.profile.office : {};
      return { value: { username, email, office_id: office.id }, isInitialized: true }
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
                <Select name="office_id">
                  {this.state.office_list.map((item) => {
                    return (<Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>);
                  })}
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

