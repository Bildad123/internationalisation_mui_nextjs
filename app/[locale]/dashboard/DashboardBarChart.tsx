import * as React from "react";
import { Student, Gender } from "@prisma/client"; // Import Gender enum from Prisma
import { BarChart } from "@mui/x-charts";

// Function to group students by their semester and gender
const groupStudentsBySemesterAndGender = (students: Student[]) => {
  const groupedData: { [semester: number]: { male: number; female: number } } =
    {};

  students.forEach((student) => {
    if (!groupedData[student.semester]) {
      groupedData[student.semester] = { male: 0, female: 0 };
    }
    if (student.gender === Gender.Male) {
      groupedData[student.semester].male++;
    } else if (student.gender === Gender.Female) {
      groupedData[student.semester].female++;
    }
  });

  return groupedData;
};

export default function DashboardBarChart({
  students,
}: {
  students: Student[];
}) {
  // Group students by semester and gender
  const groupedData = groupStudentsBySemesterAndGender(students);

  // Extracting the semesters and corresponding student counts by gender
  const semesters = Object.keys(groupedData).map(Number);
  const maleCounts = semesters.map((sem) => groupedData[sem].male);
  const femaleCounts = semesters.map((sem) => groupedData[sem].female);

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: maleCounts, label: "Male Students", id: "maleStudentsId" },
        {
          data: femaleCounts,
          label: "Female Students",
          id: "femaleStudentsId",
        },
      ]}
      xAxis={[{ scaleType: "band", data: semesters }]} // Using semester numbers as x-axis labels
    />
  );
}
