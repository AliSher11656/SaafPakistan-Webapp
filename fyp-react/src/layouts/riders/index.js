import { useState } from "react";

import Riders from "./data/getriders";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Grid, Icon, Input } from "@mui/material";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function Rider() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDBox
                    pt={2}
                    pb={2}
                    px={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <MDTypography
                      variant="h6"
                      fontWeight="medium"
                      color="white"
                    >
                      All Riders
                    </MDTypography>
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ backgroundColor: "white" }}
                    ></Input>
                  </MDBox>
                </MDBox>
                <MDBox pt={3}>
                  <div>
                    <Riders
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Rider;
