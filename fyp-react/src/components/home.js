import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import MainNav from "../ui/MainNav";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <MainNav></MainNav>
      <nav>
        <p>Welcome Home</p>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Home;
