import * as React from "react";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import * as apiService from "../api-service";
import { AuthContext } from "../../context/AuthContext";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function Dashboard() {
  const [numberOfOrders, setNumberOfOrders] = React.useState(0);
  const { user } = React.useContext(AuthContext);
  const date = new Date();
  const [orderStatusCounts, setOrderStatusCounts] = React.useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
  });
  const [usersSignedData, setUsersSignedData] = React.useState({
    labels: [],
    datasets: { label: "", data: [] },
  });

  // console.log("usersSignedData == ", usersSignedData);
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.getIdToken) {
        return;
      }
      const userIdToken = await user.getIdToken();
      try {
        const Data = await apiService.getStats(userIdToken);
        const orders = Data.orders;
        const usersSignedData = Data.usersSigned;

        setUsersSignedData(usersSignedData);

        const numberOfOrders = orders.length;
        setNumberOfOrders(numberOfOrders);
        const counts = orders.reduce(
          (acc, order) => {
            if (order.status === 0) acc.pending++;
            else if (order.status === 1) acc.completed++;
            else if (order.status === 3) acc.cancelled++;
            return acc;
          },
          { pending: 0, completed: 0, cancelled: 0 }
        );
        setOrderStatusCounts(counts);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DefaultInfoCard
              icon="shopping_cart"
              title="Total Orders"
              description="Total number of orders placed"
              value={numberOfOrders}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="pending"
                title="Pending Orders"
                description="Total number of pending pickups"
                value={orderStatusCounts.pending}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="check_circle"
                title="Completed Orders"
                description="Total number of pickups completed"
                value={orderStatusCounts.completed}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <DefaultInfoCard
                icon="cancel"
                title="Cancelled Orders"
                description="Total number of cancelled pickups"
                value={orderStatusCounts.cancelled}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Users Signed Up"
                  description={
                    <>
                      Total users signed up in{" "}
                      <strong>{date.getFullYear()}</strong>.{" "}
                    </>
                  }
                  date={date.toLocaleDateString()}
                  chart={usersSignedData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </>
    </DashboardLayout>
  );
}

export default Dashboard;
