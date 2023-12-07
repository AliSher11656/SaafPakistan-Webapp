import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc as firestoreDoc } from "firebase/firestore";

const Signup = ({ userType }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [idCard, setIdCard] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [area, setArea] = useState("");

  const [dbareas, setdbAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasCollection = collection(firestore, "Areas"); // Replace with your collection name
        const areasSnapshot = await getDocs(areasCollection);
        const areasData = areasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setdbAreas(areasData);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

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

      const db = userType === "rider" ? "Riders" : "warehouseManager";

      // Store additional user information in Firestore
      const userDoc = {
        userId: user.uid,
        firstName,
        lastName,
        phone,
        email,
        address,
        idCard,
      };
      if (userType === "rider") {
        const areaRef = firestoreDoc(firestore, `Areas/${area}`);
        userDoc.area = areaRef;
        userDoc.vehicleNumber = vehicleNumber;
      }

      await addDoc(collection(firestore, db), userDoc);
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
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label htmlFor="id-card">ID Card Number</label>
                <input
                  type="number"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  placeholder="ID Card Number"
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
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
              {userType === "rider" && (
                <>
                  <div>
                    <label htmlFor="area">Area</label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    >
                      <option value="">Select an area</option>
                      {dbareas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.location}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="vehicleNumber">Vehicle Number</label>
                    <input
                      type="text"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      placeholder="Vehicle Number"
                    />
                  </div>
                </>
              )}
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
