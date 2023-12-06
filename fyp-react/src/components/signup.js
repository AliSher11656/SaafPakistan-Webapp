import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase-config";
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [idCardNumber, setIdCardNumber] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed in
      const user = userCredential.user;
      console.log(user);

      // Store additional user information in Firestore
      await addDoc(collection(firestore, "warehouseManagers"), {
        userId: user.uid,
        email,
        address,
        idCardNumber,
      });

      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <main>
      <section>
        <div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>

              <div>
                <label htmlFor="id-card-number">ID Card Number</label>
                <input
                  type="text"
                  value={idCardNumber}
                  onChange={(e) => setIdCardNumber(e.target.value)}
                  placeholder="ID Card Number"
                />
              </div>

              <button type="submit">Sign up</button>
            </form>

            <p>
              {/* Already have an account? <NavLink to="/login">Sign in</NavLink> */}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
