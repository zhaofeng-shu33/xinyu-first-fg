// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import Charts from './pages/Charts';
import BaiscCharts from './pages/BaiscCharts';
import Setting from './pages/Setting';
import UserProfile from './pages/UserProfile';
import { Forbidden, NotFound, ServerError } from './pages/Exception';
import { getRouterData } from './utils/utils';
import { asideMenuConfig } from './menuConfig';

const routerConfig = [
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/chart/general',
    component: Charts,
  },
  {
    path: '/chart/basic',
    component: BaiscCharts,
  },
  {
    path: '/account/setting',
    component: Setting,
    authority: 'user',
  },
  {
    path: '/account/user',
    component: UserProfile,
  },
  {
    path: '/exception/500',
    component: ServerError,
  },
  {
    path: '/exception/403',
    component: Forbidden,
  },
  {
    path: '/exception/404',
    component: NotFound,
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
];

const routerData = getRouterData(routerConfig, asideMenuConfig);

export { routerData };
