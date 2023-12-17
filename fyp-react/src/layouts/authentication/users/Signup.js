import { useState } from "react";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

// @mui material components
import Card from "@mui/material/Card";

// Amdin panel React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import {
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
} from "@mui/material";
import { green } from "@mui/material/colors";
import * as React from "react";

// Authentication layout components
import BasicLayout from "layouts/authentication/BasicLayout";

// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Signup() {
  const [loading, setLoading] = React.useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupCustomError, setSignupCustomError] = useState(false);
  const [dbareas, setdbAreas] = useState([]);

  React.useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasCollection = collection(db, "Areas");
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

  const [signupUser, setSignupUser] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    uid: "",
    phone: "",
    address: "",
    idCard: "",
    area: "",
    vehicleNumber: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    //post credentials into authentication

    if (signupUser.role === "admin" || signupUser.name !== "") {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          signupUser.email,
          signupUser.password
        );

        if (
          signupUser.role === "admin" ||
          signupUser.role === "warehouseManager" ||
          signupUser.role === "rider"
        ) {
          const dblocation = signupUser.role;

          if (
            signupUser.role === "admin" ||
            signupUser.role === "warehouseManager"
          ) {
            const userDocRef = doc(db, dblocation, user.user.uid);
            await setDoc(userDocRef, {
              email: signupUser.email,
              role: signupUser.role,
              name: signupUser.name,
              uid: user.user.uid,
              phone: signupUser.phone,
              address: signupUser.address,
              idCard: signupUser.idCard,
            });

            const userDocRef2 = doc(db, "users", user.user.uid);
            await setDoc(userDocRef2, {
              email: signupUser.email,
              role: signupUser.role,
              name: signupUser.name,
              uid: user.user.uid,
              phone: signupUser.phone,
              address: signupUser.address,
              idCard: signupUser.idCard,
            });
          }
          if (signupUser.role === "rider") {
            const areaDocRef = doc(db, "Areas", signupUser.area);

            const userDocRef3 = doc(db, "rider", user.user.uid);
            await setDoc(userDocRef3, {
              email: signupUser.email,
              role: signupUser.role,
              name: signupUser.name,
              uid: user.user.uid,
              phone: signupUser.phone,
              address: signupUser.address,
              idCard: signupUser.idCard,
              area: areaDocRef,
              vehicleNumber: signupUser.vehicleNumber,
            });
          }
        }

        setSignupUser({
          email: "",
          password: "",
          role: "",
          name: "",
          uid: "",
          phone: "",
          address: "",
          idCard: "",
          area: "",
          vehicleNumber: "",
        });

        setLoading(false);
      } catch (error) {
        setSignupError(error.code);
        setLoading(false);
      }
    } else {
      setSignupCustomError(true);
      setLoading(false);
    }
  };

  return (
    <BasicLayout>
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
          position: "relative",
          marginTop: "25%",
        }}
      >
        <Card scroll>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
              SIGN UP
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            {signupError && (
              <MDBox mb={2} p={1}>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    sx: {
                      "& input": {
                        color: "red",
                      },
                    },
                  }}
                  error
                  label="Error"
                  value={signupError}
                  variant="standard"
                />
              </MDBox>
            )}
            {signupCustomError === false ? null : (
              <MDBox mb={2} p={1}>
                <TextField
                  fullWidth
                  InputProps={{
                    readOnly: true,
                    sx: {
                      "& input": {
                        color: "red",
                      },
                    },
                  }}
                  error
                  label="Error"
                  value="Please fill input field!"
                  variant="standard"
                />
              </MDBox>
            )}

            <MDBox mb={2}>
              <MDInput
                value={signupUser.name}
                onChange={(e) =>
                  setSignupUser({
                    ...signupUser,
                    name: e.target.value,
                  })
                }
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                required
              />
            </MDBox>

            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  value={signupUser.email}
                  onChange={(e) =>
                    setSignupUser({
                      ...signupUser,
                      email: e.target.value,
                    })
                  }
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  value={signupUser.password}
                  onChange={(e) =>
                    setSignupUser({
                      ...signupUser,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <FormControl fullWidth variant="standard">
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ height: "2.8rem" }}
                    required
                  >
                    Select Role
                  </InputLabel>
                  <Select
                    sx={{ height: "1.8rem" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={signupUser.role}
                    label="Select Role"
                    onChange={(e) =>
                      setSignupUser({
                        ...signupUser,
                        role: e.target.value,
                      })
                    }
                  >
                    <MenuItem key={1} value={"admin"}>
                      Admin
                    </MenuItem>
                    <MenuItem key={2} value={"warehouseManager"}>
                      Warehouse Manager
                    </MenuItem>
                    <MenuItem key={3} value={"rider"}>
                      Rider
                    </MenuItem>
                  </Select>
                </FormControl>
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  value={signupUser.idCard}
                  onChange={(e) =>
                    setSignupUser({
                      ...signupUser,
                      idCard: e.target.value,
                    })
                  }
                  type="number"
                  label="ID Card Number"
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  value={signupUser.phone}
                  onChange={(e) =>
                    setSignupUser({
                      ...signupUser,
                      phone: e.target.value,
                    })
                  }
                  type="number"
                  label="Phone"
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  value={signupUser.address}
                  onChange={(e) =>
                    setSignupUser({
                      ...signupUser,
                      address: e.target.value,
                    })
                  }
                  type="text"
                  label="Address"
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>

              {/* ////////////////////////////////////////////////////////////////////////// */}

              {signupUser.role !== "rider" ? null : (
                <>
                  <MDBox mb={2}>
                    <MDInput
                      value={signupUser.vehicleNumber}
                      onChange={(e) =>
                        setSignupUser({
                          ...signupUser,
                          vehicleNumber: e.target.value,
                        })
                      }
                      type="text"
                      label="Vehicle Number"
                      variant="standard"
                      fullWidth
                      required
                    />
                  </MDBox>

                  <MDBox mb={2}>
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ height: "2.8rem" }}
                        required
                      >
                        Select Area
                      </InputLabel>
                      <Select
                        sx={{ height: "1.8rem" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={signupUser.area}
                        label="Select Area"
                        onChange={(e) =>
                          setSignupUser({
                            ...signupUser,
                            area: e.target.value,
                          })
                        }
                      >
                        {dbareas.map((area) => (
                          <MenuItem key={area.id} value={area.id}>
                            {area.location}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </MDBox>
                </>
              )}

              <MDBox
                mt={4}
                mb={1}
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: green[500],
                      justifyContent: "center",
                    }}
                  />
                ) : (
                  <MDButton
                    // disabled={signupUser.email === '' || signupUser.password === '' || signupUser.role === '' ? true : false}
                    variant="gradient"
                    color="info"
                    fullWidth
                    type="submit"
                    onClick={handleSignup}
                  >
                    SIGN UP
                  </MDButton>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </div>
    </BasicLayout>
  );
}

export default Signup;
