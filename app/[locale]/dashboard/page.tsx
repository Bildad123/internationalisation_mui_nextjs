import prisma from "@/prisma/client";
import { Box, Grid, Paper } from "@mui/material";

import DashboardBarChart from "./DashboardBarChart";
import DashboardScatterChart from "./DashboardScatterChart";
import DashboardLineChart from "./DashboardLineChart";
import DashboardPieChart from "./DashboardPieChart";
const Dashboard = async () => {
  const students = await prisma.student.findMany({});
  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper>
            <DashboardBarChart students={students} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <DashboardScatterChart students={students} />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper sx={{ display: "flex", justifyContent: "center" }}>
            <DashboardLineChart students={students} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
