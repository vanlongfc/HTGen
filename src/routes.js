import Dashboard from "views/pages/dashboards/Dashboard.js";
import { ListComponent, AddComponent } from "views/pages/ManageComponent";
import AccountManage from "views/pages/AccountManage";
import RoleManage from "views/pages/RoleManage";
import LoginPage from "views/pages/LoginPage";
import ForgotPasswordPage from "views/pages/ForgotPasswordPage";
import ResetPasswordPage from "views/pages/ResetPasswordPage";
import AccountInfo from "views/pages/AccountInfo";
import CustomerManage from "views/pages/CustomerManage";

const routes = [
  {
    children: true,
    path: "add-order/customer/:orderId/:customerOrganizationId",
    name: "Thêm mới",
    svg: ``,
    icon: "ni ni-calendar-grid-58 text-red",
    component: AddComponent,
    layout: "/",
    roles: ["manage_order"],
  },
  {
    children: true,
    path: "account-info/:id/:tab",
    name: "Thông tin tài khoản",
    svg: ``,
    icon: "ni ni-calendar-grid-58 text-red",
    component: AccountInfo,
    layout: "/",
    roles: [],
  },
  {
    name: "Tổng quan",
    icon: "ni ni-shop text-primary",
    big: true,
    svg: `<svg style='width: 20px;height: 20px' class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  
<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
    <polyline points="0.5 8.5 7 2 13.5 8.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></polyline>
    <polyline points="2.5 6.5 2.5 13.5 11.5 13.5 11.5 6.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></polyline>
    <line x1="7" y1="13.5" x2="7" y2="10.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></line>
    <circle cx="7" cy="6.75" r="1.25" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></circle>
  </g></g></svg>`,
    state: "dashboard",
    path: "dashboard",
    component: Dashboard,
    layout: "/",
    roles: ["get_dashboardQT"],
  },
  {
    collapse: true,
    name: "Quản lý ...",
    icon: "ni ni-ungroup text-orange",
    svg: `<svg style='width: 20px;height: 20px' class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  
<g transform="matrix(1.4285714285714286,0,0,1.4285714285714286,0,0)"><g>
    <path d="M9.5,1.5H11a1,1,0,0,1,1,1v10a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V2.5a1,1,0,0,1,1-1H4.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></path>
    <rect x="4.5" y="0.5" width="5" height="2.5" rx="1" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></rect>
    <line x1="4.5" y1="5.5" x2="9.5" y2="5.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="4.5" y1="8" x2="9.5" y2="8" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></line>
    <line x1="4.5" y1="10.5" x2="9.5" y2="10.5" style="fill: none;stroke: #00305C;stroke-linecap: round;stroke-linejoin: round"></line>
  </g></g></svg>`,
    state: "order",
    roles: ["get_order", "manage_order"],
    views: [
      {
        path: "order-manage",
        name: "Danh sách ...",
        miniName: "OM",
        component: ListComponent,
        layout: "/",
        roles: ["get_order"],
      },
      {
        path: "add-order",
        name: "Thêm mới ...",
        miniName: "AO",
        component: AddComponent,
        layout: "/",
        roles: ["manage_order"],
      },
    ],
  },
  {
    collapse: true,
    redirect: true,
    name: "Auth",
    icon: "ni ni-ungroup text-orange",
    state: "auth",
    roles: [],
    views: [
      {
        path: "/login",
        name: "LoginPage",
        miniName: "AL",
        component: LoginPage,
        layout: "/auth",
        roles: [],
      },
      {
        path: "/forgot-password",
        name: "ForgotPasswordPage",
        miniName: "AF",
        component: ForgotPasswordPage,
        layout: "/auth",
        roles: [],
      },
      {
        path: "/reset-password",
        name: "ResetPasswordPage",
        miniName: "AR",
        component: ResetPasswordPage,
        layout: "/auth",
        roles: [],
      },
    ],
  },
];
export default routes;
export const routeAdmin = [
  {
    collapse: true,
    name: "Tài khoản người dùng",
    icon: "ni ni-circle-08",
    state: "account",
    roles: ["get_user", "get_role"],
    views: [
      {
        path: "accounts",
        name: "Quản lý tài khoản",
        miniName: "A",
        component: AccountManage,
        layout: "/",
        roles: ["get_user"],
      },
      {
        path: "roles",
        name: "Quản lý phân quyền",
        miniName: "R",
        component: RoleManage,
        layout: "/",
        roles: ["get_role"],
      },
    ],
  },
  {
    collapse: true,
    name: "...",
    icon: "ni ni-badge",
    state: "customer",
    roles: [],
    views: [
      {
        path: "customers",
        name: "Danh sách ...",
        miniName: "C",
        component: CustomerManage,
        layout: "/",
        roles: [],
      },
    ],
  },
];
