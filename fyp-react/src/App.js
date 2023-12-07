import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Home1 from "./components/user";
import WarehouseManager from "./ui/warehouseManager";
import RegisterWarehouseManager from "./ui/RegisterWarehouseManager";
import RegisterRider from "./ui/RegisterRider";
import Rider from "./ui/rider";

function App() {
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route index path="/" element={<Home></Home>} />
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

            {/* <Route path="/home" element={<Logout />} /> */}
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
