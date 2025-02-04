"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import NextLink from "next/link";
import ErrorDialog from "../components/ErrorDialog";

interface Translations {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  formTitle: string;
  formSubtitle: string;
  linkToSignInLabel: string;
  loginPage: string;
  action: string;
  firstnameValidationMessage: string;
  lastnameValidationMessage: string;
  emailValidationMessage: string;
  passwordValidationMessage: string;
  unexpectedError: string;
}

const SignupForm = ({ translations }: { translations: Translations }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    firstname,
    lastname,
    email,
    password,
    formTitle,
    formSubtitle,
    linkToSignInLabel,
    loginPage,
    action,
    firstnameValidationMessage,
    lastnameValidationMessage,
    emailValidationMessage,
    passwordValidationMessage,
    unexpectedError,
  } = translations;

  const registerSchema = z.object({
    firstname: z.string().min(1, { message: firstnameValidationMessage }),
    lastname: z.string().min(1, { message: lastnameValidationMessage }),
    email: z.string().email({ message: emailValidationMessage }),
    password: z.string().min(1, { message: passwordValidationMessage }),
  });

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const handleRegistration = async (data: FormData) => {
    setLoading(true);
    const response = await fetch(`/api/register`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      router.push("/signIn");
    } else {
      setLoading(false);
      setError(unexpectedError);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
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
            component="form"
            onSubmit={handleSubmit(handleRegistration)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              label={firstname}
              size="small"
              fullWidth
              {...register("firstname")}
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
            <TextField
              label={lastname}
              size="small"
              fullWidth
              {...register("lastname")}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
            <TextField
              label={email}
              size="small"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              label={password}
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
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {action}
            </Button>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ pr: 1 }}>{linkToSignInLabel}</Typography>
              <Link href="/signIn" component={NextLink}>
                {loginPage}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default SignupForm;
