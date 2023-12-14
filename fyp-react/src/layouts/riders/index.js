import { useState } from "react";

import Riders from "./data/getriders";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Rider() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <Riders searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </DashboardLayout>
  );
}

export default Rider;
