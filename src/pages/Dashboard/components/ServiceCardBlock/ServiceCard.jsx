import React, { Component } from 'react';
import { Message, Card, Button, Pagination } from '@alifd/next';
import { getClassList, applyClass } from '../../../../api/class_apply';
import { userProfile } from '../../../../store/userProfile/action';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { userProfileUpdate } from '../../../../store/userProfile/action';

@injectIntl
export class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { data: [], current: 1, count: 100 };
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  handlePaginationChange(current) {
    getClassList(current).then(json => {
      this.setState({ data: json.results });
    }).catch(error => {
      Message.error('数据加载失败');
    })    
    this.setState({
      current
    });
  }
  componentDidMount() {
    //check whether we need to update user profile
    if (this.props.profile && this.props.profile.up_to_date == false) {
      this.props.userProfile();
    }
    getClassList().then(json => {
      this.setState({ data: json.results, count: json.count });
    }).catch(error => {
      Message.error('数据加载失败');
    })
  }
  applyCancelClass(classId, cancel = '') {
    applyClass(classId).then(json => {
      if (typeof(json.lawyer) != 'undefined') {
        Message.success(cancel + '认领班级成功');
        this.props.userProfileUpdate();
        let original_data = this.state.data.slice();
        original_data.map((item) => {
          if (item.pk == classId) {
            if (cancel == '')
              item.lawyer = { user: this.props.profile.user.pk }
            else
              item.lawyer = null;
          }
        })
        this.setState({ data: original_data });
      }
      else if (json.detail) {
        Message.notice(json.detail);
      }
      else {
        Message.notice(cancel + '认领班级失败');
      }
    }).catch (error => {
      Message.error(cancel + '认领班级失败');
    })
  }
  render() {
    return (
      <div>
        {!this.props.isMobile && (<div style={styles.pagination}>
          <Pagination current={this.state.current} onChange={this.handlePaginationChange}  total={this.state.count}/>
        </div>)}
        {this.state.data.map((item, index) => {
          let date = new Date(item.start_time);
          let date_str = this.props.intl.formatDate(date);
          let time_str = this.props.intl.formatTime(date);
          let second_course_info = null;
          if (item.start_time_2) {
            let date_2 = new Date(item.start_time_2);
            let date_str_2 = this.props.intl.formatDate(date_2);
            let time_str_2 = this.props.intl.formatTime(date_2);
            let date_time_str_2 = date_str_2 + ' ' + time_str_2;
            second_course_info = <p style={styles.desc}>《{item.course_2.name}》<span>上课时间：</span>{date_time_str_2}</p>
          }
          let class_name = item.grade + '年级' + item.class_id + '班';
          let apply_class_info = null;
          if (item.lawyer) {
            apply_class_info = '已被认领';
            if (this.props.profile.user && this.props.profile.user.pk == item.lawyer.user) {
              apply_class_info = <div>已认领 <Button onClick={() => { this.applyCancelClass(item.pk, '取消') }}>取消认领</Button></div>;   
            }
          }
          else {
            apply_class_info = <Button onClick={() => { this.applyCancelClass(item.pk) }}>认领班级</Button>;
          }
          return (
              <Card key={index} title={item.school} extra={class_name}>
                <div>
                <p style={styles.desc}>《{item.course.name}》<span>上课时间：</span>{date_str + ' ' + time_str}</p>
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
        {!this.props.isMobile && (<div style={styles.pagination}>
          <Pagination current={this.state.current} onChange={this.handlePaginationChange} total={this.state.count}/>
        </div>)}
      </div>
    );
  }
}
const mapDispatchToProps = {
  userProfile,
  userProfileUpdate
};
const mapStateToProps = (state) => {
  return { profile: state.profile };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(ServiceCard);
const styles = {
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
  pagination: {
    textAlign: 'center'
  }
};
