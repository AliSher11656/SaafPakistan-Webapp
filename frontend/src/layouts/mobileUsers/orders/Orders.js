import { Grid, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import GetMobileUsersOrders from "../data/getMobileUsersOrders";

function UserOrders() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={2}>
                <MDTypography
                  variant="h6"
                  fontWeight="medium"
                  sx={{ textAlign: "center" }}
                >
                  Orders
                </MDTypography>
              </MDBox>
              <MDBox pt={1} pb={2} px={2}>
                <MDBox
                  component="ul"
                  display="flex"
                  flexDirection="column"
                  p={0}
                  m={0}
                >
                  <GetMobileUsersOrders></GetMobileUsersOrders>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UserOrders;
