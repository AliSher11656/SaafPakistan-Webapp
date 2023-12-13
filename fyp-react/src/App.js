import "./App.css";
import Login from "./components/login";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import ProtectedRoute from "./routes/protectedRoute";
import Admin from "./routes/admin";

function ProviderConfig() {
  const isLoggedInFromStorage = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInFromStorage);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    return () => {
      unmounted = true;
    };
  }, [setPath]);

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/*"
              element={<ProtectedRoute path="/*" Component={Admin} />}
            />
          </Routes>
        )}
        {isLoggedIn &&
          (path === process.env.PUBLIC_URL ||
            path === `${process.env.PUBLIC_URL}/`) && (
            <Routes>
              <Route path="/home" element={<Navigate to="/home" />} />
            </Routes>
          )}
      </Router>
    </>
  );
}

function App() {
  return <ProviderConfig></ProviderConfig>;
}

export default App;
