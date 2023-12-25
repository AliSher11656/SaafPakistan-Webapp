import Dashboard from "layouts/dashboard";

import Signup from "layouts/authentication/users/Signup";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import PeopleIcon from "@mui/icons-material/People";

import * as React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import Rider from "layouts/riders";
import WarehouseManager from "layouts/warehouseManager";
import MobileUser from "layouts/mobileUsers";
import RiderSignup from "layouts/authentication/users/RiderSignup";

const AdminAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "admin" ? children : <Navigate to="/login" />;
};
const WarehouseManagerAuthRoutes = ({ children }) => {
  const { role } = useContext(AuthContext);
  return role === "warehouseManager" ? children : <Navigate to="/login" />;
};

const routes = [
  {
    routeRole: "admin",
    type: "collapse",
    name: "Dashboard",
    key: "admin/dashboard",
    icon: <DashboardIcon />,
    route: "/admin/dashboard",
    component: (
      <AdminAuthRoutes>
        <Dashboard />
      </AdminAuthRoutes>
    ),
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Riders",
    key: "admin/rider",
    icon: <TwoWheelerIcon />,
    route: "/admin/rider",
    component: (
      <AdminAuthRoutes>
        <Rider />
      </AdminAuthRoutes>
    ),
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Warehouse Managers",
    key: "admin/warehouseManager",
    icon: <WarehouseIcon />,
    route: "/admin/warehouseManager",
    component: (
      <AdminAuthRoutes>
        <WarehouseManager></WarehouseManager>
      </AdminAuthRoutes>
    ),
  },
  {
    routeRole: "admin",
    type: "collapse",
    name: "Users",
    key: "admin/users",
    icon: <PeopleIcon />,
    route: "/admin/users",
    component: <AdminAuthRoutes>{<MobileUser></MobileUser>}</AdminAuthRoutes>,
  },

  {
    routeRole: "admin",
    type: "collapse",
    name: "Register",
    icon: <PersonAddIcon />,
    route: "/admin/signup",
    component: (
      <AdminAuthRoutes>
        <Signup />
      </AdminAuthRoutes>
    ),
  },
  ////////////////////Warehouse Manager routes/////////////////////////////////////////

  {
    routeRole: "warehouseManager",
    type: "collapse",
    name: "Dashboard",
    key: "warehouseManager/dashboard",
    icon: <DashboardIcon />,
    route: "/warehouseManager/dashboard",
    component: (
      <WarehouseManagerAuthRoutes>
        <Dashboard />
      </WarehouseManagerAuthRoutes>
    ),
  },
  {
    routeRole: "warehouseManager",
    type: "collapse",
    name: "Riders",
    key: "warehouseManager/rider",
    icon: <TwoWheelerIcon />,
    route: "/warehouseManager/rider",
    component: (
      <WarehouseManagerAuthRoutes>
        <Rider />
      </WarehouseManagerAuthRoutes>
    ),
  },
  {
    routeRole: "warehouseManager",
    type: "collapse",
    name: "Add Rider",
    key: "warehouseManager/Add Rider",
    icon: <PersonAddIcon />,
    route: "/warehouseManager/addRider",
    component: (
      <WarehouseManagerAuthRoutes>
        <RiderSignup></RiderSignup>
      </WarehouseManagerAuthRoutes>
    ),
  },
];

const authRoutes = [];
export default routes;
export { authRoutes };
