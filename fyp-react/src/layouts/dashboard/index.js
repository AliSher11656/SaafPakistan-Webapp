import * as React from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
    </DashboardLayout>
  );
}

export default Dashboard;
