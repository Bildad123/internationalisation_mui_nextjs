"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Student } from "@prisma/client";
import {
  Button,
  Divider,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorDialog from "../../components/ErrorDialog";

interface Translations {
  firstname: string;
  lastname: string;
  matriculation: string;
  email: string;
  semester: string;
  gender: string;
  update: string;
  create: string;

  firstnameMinValidationMessage: string;
  firstnameMaxValidationMessage: string;
  lastnameMinValidationMessage: string;
  lastnameMaxValidationMessage: string;
  matriculationMinValidationMessage: string;
  matriculationMaxValidationMessage: string;
  matriculationRefineValidationMessage: string;
  emailValidationMessage: string;
}

interface Props {
  student?: Student;
  translations: Translations;
}

const StudentsForm = ({ student, translations }: Props) => {
  const router = useRouter();
  const {
    firstnameMaxValidationMessage,
    firstnameMinValidationMessage,
    lastnameMaxValidationMessage,
    lastnameMinValidationMessage,
    matriculationMaxValidationMessage,
    matriculationMinValidationMessage,
    matriculationRefineValidationMessage,
    emailValidationMessage,
  } = translations;

  const studentSchema = z.object({
    firstName: z
      .string()
      .min(1, firstnameMinValidationMessage)
      .max(50, firstnameMaxValidationMessage),
    lastName: z
      .string()
      .min(1, lastnameMinValidationMessage)
      .max(50, lastnameMaxValidationMessage),
    matrikel: z
      .string()
      .min(8, matriculationMinValidationMessage)
      .max(10, matriculationMaxValidationMessage)
      .refine((data) => /^\d+$/.test(data), {
        message: matriculationRefineValidationMessage,
      }),
    email: z
      .string()
      .optional()
      .refine(
        (value) =>
          value === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        {
          message: emailValidationMessage,
        }
      ),
    semester: z
      .string()
      .min(1, "Semester is required")
      .transform((val) => parseInt(val, 10)) // Transform string to integer
      .refine((val) => !isNaN(val), {
        message: "Semester must be a valid number",
      }), // Validate it's a number
    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
    }),
  });

  type StudentsFormData = z.infer<typeof studentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentsFormData>({
    resolver: zodResolver(studentSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    firstname,
    lastname,
    matriculation,
    email,
    semester,
    gender,
    update,
    create,
  } = translations;

  console.log("semester : " + semester);

  return (
    <Container
      component={"form"}
      onSubmit={handleSubmit(async (data) => {
        try {
          setSubmitting(true);
          if (student) {
            await axios.patch("/api/students/" + student.id, data);
            router.push("/students/" + student?.id);
          } else {
            await axios.post("/api/students", data);
            router.push("/students/list");
          }

          router.refresh();
        } catch (error) {
          setSubmitting(false);
          setError("An unexpected error occurred.");
        }
      })}
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
            minHeight: "50vh",
            width: "100%",
          }}
        >
          {error && <ErrorDialog>{error}</ErrorDialog>}

          <Typography variant="h5" alignSelf={"center"}>
            {student ? update : create}
          </Typography>
          <Box>
            {/* First Name */}
            <TextField
              fullWidth
              label={firstname}
              defaultValue={student?.firstName}
              placeholder={firstname}
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              margin="normal"
              size="small"
            />

            <Divider sx={{ my: 0.5 }} />

            {/* Last Name */}
            <TextField
              fullWidth
              label={lastname}
              defaultValue={student?.lastName}
              placeholder={lastname}
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              margin="normal"
              size="small"
            />

            <Divider sx={{ my: 0.5 }} />

            {/* Matriculation */}
            <TextField
              fullWidth
              label={matriculation}
              defaultValue={student?.matrikel}
              placeholder={matriculation}
              {...register("matrikel")}
              error={!!errors.matrikel}
              helperText={errors.matrikel?.message}
              margin="normal"
              size="small"
            />

            <Divider sx={{ my: 0.5 }} />

            {/* Email */}
            <TextField
              fullWidth
              label={email}
              defaultValue={student?.email ?? ""}
              placeholder={email}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              size="small"
            />

            <Divider sx={{ my: 0.5 }} />

            {/* Semester */}
            <TextField
              fullWidth
              label={semester}
              placeholder={semester}
              defaultValue={student?.semester ?? ""}
              {...register("semester")}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              margin="normal"
              size="small"
            />

            <Divider sx={{ my: 0.5 }} />

            {/* Gender */}
            <FormControl
              fullWidth
              margin="normal"
              size="small"
              error={!!errors.gender}
            >
              <InputLabel>{gender}</InputLabel>
              <Select
                label={gender}
                defaultValue={student?.gender ?? ""}
                {...register("gender")}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {errors.gender && (
                <Typography variant="caption" color="error">
                  {errors.gender.message}
                </Typography>
              )}
            </FormControl>

            <Divider sx={{ my: 0.5 }} />

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ my: 3 }}
            >
              {student ? update : create}
              {isSubmitting && (
                <CircularProgress size={24} sx={{ ml: 2, color: "white" }} />
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default StudentsForm;
