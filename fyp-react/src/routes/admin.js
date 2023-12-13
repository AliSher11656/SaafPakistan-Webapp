import { Spin } from "antd";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../components/home";
import Home1 from "../components/user";
import WarehouseManager from "../ui/warehouseManager";
import RegisterWarehouseManager from "../ui/RegisterWarehouseManager";
import RegisterRider from "../ui/RegisterRider";
import Rider from "../ui/rider";
import Signup from "../components/signup";
import Login from "../components/login";

const Admin = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/home" element={<Home></Home>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/riders" element={<Rider></Rider>} />
        <Route path="/user" element={<Home1></Home1>} />
        <Route
          path="/warehouseManager"
          element={<WarehouseManager></WarehouseManager>}
        />
        <Route
          path="/warehouseManager/register"
          element={<RegisterWarehouseManager></RegisterWarehouseManager>}
        />
        <Route
          path="/riders/register"
          element={<RegisterRider></RegisterRider>}
        />
      </Routes>
    </Suspense>
  );
});

export default Admin;
