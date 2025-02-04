"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  IconButton,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../components";
import ErrorDialog from "../components/ErrorDialog";

interface Translations {
  email: string;
  password: string;
  formTitle: string;
  formSubtitle: string;
  linkToRegisterLabel: string;
  registerPage: string;
  action: string;
  emailValidationMessage: string;
  passwordValidationMessage: string;
  unexpectedError: string;
}

const Form = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    formTitle,
    linkToRegisterLabel,
    registerPage,
    action,
    emailValidationMessage,
    passwordValidationMessage,
    unexpectedError,
  } = translations;

  const loginSchema = z.object({
    email: z.string().email({ message: emailValidationMessage }),
    password: z.string().min(1, { message: passwordValidationMessage }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashbord",
    });
    if (response?.ok) {
      router.push("/dashbord");
      router.refresh();
    } else {
      setLoading(false);
      setError(unexpectedError);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  type FormData = z.infer<typeof loginSchema>;

  return (
    <Container
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xs" component={Paper} elevation={5}>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            width: "100%",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            {formTitle}
          </Typography>
          <ErrorDialog>{error}</ErrorDialog>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label={email}
              size="small"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label={password}
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1, mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : action}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{linkToRegisterLabel}</Typography>
              <Link
                href="/register"
                component={NextLink}
                sx={{ml: 1 }}
              >
                {registerPage}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Form;
