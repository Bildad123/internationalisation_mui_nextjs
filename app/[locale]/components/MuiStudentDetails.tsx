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
  Container,
  Stack,
} from "@mui/material";
import { useTranslate } from "@/app/Translations";
import EditStudentButton from "../students/[id]/EditStudentButton";
import TranslatedDeleteStudentButton from "../students/[id]/TranslatedDeleteStudentButton";

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  matrikel: string;
  createdAt: Date;
  updatedAt: Date;
}

const MuiStudentDetails = ({
  student,
  studentId,
}: {
  student: Student | null;
  studentId: string;
}) => {
  // Fetch translations dynamically
  const translations = {
    firstname: useTranslate("students.id.studentDetails.firstname"),
    lastname: useTranslate("students.id.studentDetails.lastname"),
    createdAt: useTranslate("students.id.studentDetails.createdAt"),
    updatedAt: useTranslate("students.id.studentDetails.updatedAt"),
  };

  const { firstname, lastname, createdAt, updatedAt } = translations;

  // Check if translations are still loading
  const isLoading = !firstname || !lastname || !createdAt || !updatedAt;

  const formatDateToString = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  // Render a loading state (skeleton or simple text) until translations are ready
  if (isLoading) {
    return <Typography>Loading translations...</Typography>;
  }

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
            alt={`${student?.firstName} ${student?.lastName}`}
          >
            {student?.firstName[0]}
            {student?.lastName[0]} {/* Get initials */}
          </Avatar>
        </Grid>
        <Grid item xs>
          <Box>
            <Typography variant="h6" component="div" display="flex" gap={1}>
              <Typography variant="body1">{firstname}:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {student?.firstName}
              </Typography>
            </Typography>

            <Typography variant="h6" component="div" display="flex" gap={1}>
              <Typography variant="body1">{lastname}:</Typography>
              <Typography variant="body1" fontWeight="bold">
                {student?.lastName}
              </Typography>
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {student?.email}
            </Typography>
            <Typography variant="body2" color="teal">
              {student?.matrikel}
            </Typography>
          </Box>
        </Grid>

        {/* Dates */}

        <Grid item>
          <Stack gap={2}>
            <Chip
              label={`${createdAt}: ${formatDateToString(
                student?.createdAt.getDate().toLocaleString() || ""
              )}`}
              color="primary"
            />

            <Chip
              label={`${updatedAt}: ${formatDateToString(
                student?.updatedAt.getDate().toLocaleString() || ""
              )}`}
              color="secondary"
            />
          </Stack>
        </Grid>
      </Grid>

      <Grid item>
        {/* Card Actions for Edit and Delete */}
        <CardActions sx={{ justifyContent: "center", gap: 1, mt: 2 }}>
          <EditStudentButton id={studentId} />

          <TranslatedDeleteStudentButton
            studentId={studentId}
            numberOfThesiss={numOfThesis}
          />
        </CardActions>
      </Grid>
    </Container>
  );
};

export default MuiStudentDetails;
