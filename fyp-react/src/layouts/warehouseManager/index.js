import { useState } from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import WarehouseManagers from "./data/getWarehouseManagers";

function WarehouseManager() {
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
        <WarehouseManagers
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </DashboardLayout>
  );
}

export default WarehouseManager;
