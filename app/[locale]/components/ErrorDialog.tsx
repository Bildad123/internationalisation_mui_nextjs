import { Alert, Box } from "@mui/material";

import React from "react";

interface Props {
  className?: string;
  children: string;
}
const ErrorDialog = ({ children }: Props) => {
  if (!children) return null;

  return (
    <Box p={2}>
      {" "}
      <Alert variant="filled" severity="error">
        {children}
      </Alert>
    </Box>
  );
};

export default ErrorDialog;
