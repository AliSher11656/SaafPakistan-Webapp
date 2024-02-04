import * as React from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          fontSize: "2.5em",
        }}
      >
        <span>Under Construction</span>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
