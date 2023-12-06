// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, firestore } from "../config/firebase-config";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// function App() {
//   const [users, setSUers] = useState([]);
//   const userCollectionREf = collection(firestore, "users");
//   useEffect(() => {
//     const getusers = async () => {
//       const data = await getDocs(userCollectionREf);
//       console.log(data);
//     };
//     getusers();
//   }, []);
// }

// export default App();

// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase-config";
// import { MainNav } from "../ui/main";

// const Home = () => {
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         const uid = user.uid;
//         // ...
//         console.log("uid", uid);
//       } else {
//         // User is signed out
//         // ...
//         console.log("user is logged out");
//       }
//     });
//   }, []);

//   return <section>…</section>;
// };

// export default Home;
