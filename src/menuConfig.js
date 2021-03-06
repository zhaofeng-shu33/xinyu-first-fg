// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: 'feedback',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: 'help',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
    children: [
      {
        name: 'monitor',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: 'chart',
    path: '/chart',
    icon: 'chart1',
    authority: 'admin',
    children: [
      {
        name: 'basic',
        path: '/chart/basic',
      },
      {
        name: 'general',
        path: '/chart/general',
      },
    ],
  },
  {
    name: 'account',
    path: '/account',
    icon: 'person',
    authority: 'user',
    children: [
      {
        name: 'user',
        path: '/account/user',
      },
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
