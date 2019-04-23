import React, { Component } from 'react';
import { Grid, Icon, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { getClassList } from '../../../../api/class_apply';
const { Row, Col } = Grid;
import { injectIntl } from 'react-intl';
// MOCK 数据，实际业务按需进行替换
const getData = () => {
  return Array.from({ length: 6 }).map(() => {
    return {
      name: '服务名称',
      desc: '这里是一段相关的服务简介，介绍产品的功能、特点',
      tag: '精选',
    };
  });
};

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
      <Row wrap gutter="20">
        {this.state.data.map((item, index) => {
          let date = new Date(item.start_time);
          let date_str = this.props.intl.formatDate(date);
          let time_str = this.props.intl.formatTime(date);
          return (
            <Col l="8" key={index}>
              <IceContainer style={styles.container}>
                <div style={styles.body}>
                  <h5 style={styles.name}>{item.school}</h5>
                  <p style={styles.desc}>《{item.course.name}》</p>
                  <p style={styles.desc}> <span>上课时间：</span>{date_str + ' ' + time_str} </p>
                  <div style={styles.tag}> {item.course.grade} 年级 {item.class_id} 班</div>
                </div>
                <div style={styles.footer}>
                  <a href="#" style={{ ...styles.link, ...styles.line }}>
                    <Icon type="office" size="small" style={styles.icon} />
                    课程介绍
                  </a>
                  <a href="#" style={styles.link}>
                    <Icon type="box" size="small" style={styles.icon} />
                    认领班级
                  </a>
                </div>
              </IceContainer>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const styles = {
  container: {
    padding: '0',
  },
  body: {
    padding: '20px',
    height: '120px',
    position: 'relative',
    borderBottom: '1px solid #f0f0f0',
  },
  name: {
    margin: '0',
    padding: '0',
    height: '28px',
    lineHeight: '28px',
    fontSize: '16px',
    color: '#0d1a26',
  },
  desc: {
    fontSize: '14px',
    color: '#697b8c',
    margin: '12px 0',
  },
  tag: {
    background: '#fff0f6',
    border: '1px solid #ffadd2',
    color: '#eb2f96',
    position: 'absolute',
    right: '20px',
    top: '20px',
    padding: '4px 12px',
    textAlign: 'center',
    borderRadius: '50px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    height: '56px',
    lineHeight: '56px',
    color: '#314659',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '50%',
    textAlign: 'center',
  },
  line: {
    borderRight: '1px solid #f0f0f0',
  },
  icon: {
    marginRight: '5px',
  },
};
