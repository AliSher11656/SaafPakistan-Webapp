import propTypes from "prop-types";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function ProtectedRoute({ Component, path }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? (
    <Routes>
      <Route element={<Component />} path={path} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/ninjadash-react/admin" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  Component: propTypes.elementType.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
