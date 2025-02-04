"use client";

import {
  Paper,
  Typography,
  InputAdornment,
  Divider,
  Container,
} from "@mui/material";
import { Box, IconButton, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ErrorDialog from "../components/ErrorDialog";

interface Translations {
  action: string;
  confirmation: string;
}

const SignOut = ({ translations }: { translations: Translations }) => {
  const { action, confirmation } = translations;

  const handleSignout = async () => {
    signOut({ callbackUrl: "http://localhost:3000" });
  };

  return (
    <Container maxWidth="xs" component={Paper} elevation={5}>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {action}
        </Typography>

        <Typography>{confirmation}?</Typography>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Button color="error" variant="contained" fullWidth onClick={handleSignout}>
            {action}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignOut;
