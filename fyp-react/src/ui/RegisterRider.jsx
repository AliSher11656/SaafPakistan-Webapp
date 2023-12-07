// RegisterRider.js
import React from "react";
import Signup from "../components/signup";

const RegisterRider = () => {
  return (
    <div>
      <h1>Register New Rider</h1>
      <Signup userType="rider" />
    </div>
  );
};

export default RegisterRider;
