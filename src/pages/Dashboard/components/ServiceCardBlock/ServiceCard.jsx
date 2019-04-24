import React, { Component } from 'react';
import { Message, Card } from '@alifd/next';
import { getClassList } from '../../../../api/class_apply';
import { injectIntl } from 'react-intl';

@injectIntl
export default class ServiceCard extends Component {
  static displayName = 'ServiceCard';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {data:[]};
  }
  componentDidMount() {
    getClassList().then(json => {
      this.setState({ data: json });
    }).catch(error => {
      Message.error('数据加载失败');
    })
  }
  render() {
    return (
      <div>
        {this.state.data.map((item, index) => {
          let date = new Date(item.start_time);
          let date_str = this.props.intl.formatDate(date);
          let time_str = this.props.intl.formatTime(date);
          let class_name = item.course.grade + '年级' +  item.class_id + '班';
          return (
              <Card key={index} title={item.school} extra={class_name}>
                <div>
                  <p style={styles.desc}>《{item.course.name}》</p>
                  <p style={styles.desc}> <span>上课时间：</span>{date_str + ' ' + time_str} </p>
                </div>
              <div style={styles.footer}>
                <a href="#" style={styles.link}>
                    课程介绍
                  </a>
                <a href="#" style={styles.link}>
                    认领班级
                  </a>
                </div>
              </Card>
          );
        })}
      </div>
    );
  }
}

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
    color: '#314659',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
};
