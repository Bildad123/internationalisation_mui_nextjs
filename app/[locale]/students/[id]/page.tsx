import prisma from "@/prisma/client";

import { notFound } from "next/navigation";
import MuiStudentDetails from "../../components/MuiStudentDetails";
import { Box } from "@mui/material";

interface Props {
  params: { id: string };
}

const StudentDetailPage = async ({ params }: Props) => {
  // Lade die Daten des Studenten und seine zugehörige Thesis.
  const student = await prisma?.student.findUnique({
    where: { id: params.id },
  });

  // Wenn der Student nicht gefunden wurde, zeige eine 404-Seite an.
  if (!student) {
    notFound();
  }

  return (
    <Box>
      <MuiStudentDetails student={student} studentId={student.id} />
    </Box>
  );
};

export default StudentDetailPage;
