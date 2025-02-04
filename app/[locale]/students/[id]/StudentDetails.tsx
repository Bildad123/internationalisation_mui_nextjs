"use client";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  Chip,
  CardActions,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { useTranslate } from "@/app/Translations";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditStudentButton from "./EditStudentButton";
import MuiStudentDetails from "../../components/MuiStudentDetails";
interface Student {
  firstName: string;
  lastName: string;
  email: string;
  matrikel: string;
  createdAt: string;
  updatedAt: string;
}

const StudentDetails = ({ student }: { student: Student }) => {
  // Fetch translations dynamically
  const translations = {
    firstname: useTranslate("students.id.studentDetails.firstname"),
    lastname: useTranslate("students.id.studentDetails.lastname"),
    createdAt: useTranslate("students.id.studentDetails.createdAt"),
    updatedAt: useTranslate("students.id.studentDetails.updatedAt"),
  };

  const { firstname, lastname, createdAt, updatedAt } = translations;

  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const formatDateToString = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Container
      maxWidth="md"
      component={Card}
      sx={{ margin: "auto", padding: 3 }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Avatar and student info */}
        <Grid item>
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt={`${student.firstName} ${student.lastName}`}
          >
            {student.firstName[0]}
            {student.lastName[0]} {/* Get initials */}
          </Avatar>
        </Grid>
        <Grid item xs>
          <Box>
            <Typography variant="h6" component="div" display="flex" gap={1}>
              <Typography variant="body1">{firstname}:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {student.firstName}
              </Typography>
            </Typography>

            <Typography variant="h6" component="div" display="flex" gap={1}>
              <Typography variant="body1">{lastname}:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {student.lastName}
              </Typography>
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {student.email}
            </Typography>
            <Typography variant="body2" color="teal">
              {student.matrikel}
            </Typography>
          </Box>
        </Grid>

        {/* Dates */}

        <Grid item>
          <Stack gap={2}>
            <Chip
              label={`${createdAt}: ${formatDateToString(student.createdAt)}`}
              color="primary"
            />

            <Chip
              label={`${updatedAt}: ${formatDateToString(student.updatedAt)}`}
              color="secondary"
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid item>
        {/* Card Actions for Edit and Delete */}
        <CardActions sx={{ justifyContent: "center", gap: 1, mt: 2 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => console.log("Edit student")}
          >
            Edit
          </Button>

          <MuiStudentDetails/>
          <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={() => console.log("Delete student")}
          >
            Delete
          </Button>
        </CardActions>
      </Grid>
    </Container>
  );
};

export default StudentDetails;
