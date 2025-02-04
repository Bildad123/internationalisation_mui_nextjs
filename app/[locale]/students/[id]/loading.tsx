import React from "react";
import {Box, Card, Grid, Skeleton } from "@mui/material";

const LoadingStudentDetailPage = () => {
  return (
    <Box sx={{ maxWidth: "600px", margin: "auto" }}>
      <Card sx={{ padding: 2, width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* Avatar Skeleton */}
          <Skeleton variant="circular" width={40} height={40} />

          <Box sx={{ width: "100%" }}>
            {/* First Name Skeleton */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Skeleton width="8rem" />
            </Box>

            {/* Last Name Skeleton */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Skeleton width="8rem" />
            </Box>

            {/* Email and Matriculation Skeleton */}
            <Skeleton width="10rem" />
            <Skeleton width="5rem" />

            {/* Date Information Skeleton */}
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ marginTop: 2 }}
            >
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Skeleton width="8rem" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Skeleton width="8rem" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default LoadingStudentDetailPage;
