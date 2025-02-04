import * as React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Student, Gender } from "@prisma/client"; // Import Gender enum from Prisma

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

export default function DashboardScatterChart({
  students,
}: {
  students: Student[];
}) {
  // Group students by semester and gender
  const groupedData = groupStudentsBySemesterAndGender(students);

  // Extracting the semesters and corresponding student counts by gender
  const semesters = Object.keys(groupedData).map(Number);
  const maleData = semesters.map((sem, index) => ({
    id: `male-${index}`, // Adding a unique id for each male data point
    x: sem, // Semester on x-axis
    y: groupedData[sem].male, // Male student count on y-axis
  }));
  const femaleData = semesters.map((sem, index) => ({
    id: `female-${index}`, // Adding a unique id for each female data point
    x: sem, // Semester on x-axis
    y: groupedData[sem].female, // Female student count on y-axis
  }));

  return (
    <ScatterChart
      width={600}
      height={300}
      series={[
        {
          label: "Male Students",
          data: maleData,
        },
        {
          label: "Female Students",
          data: femaleData,
        },
      ]}
    />
  );
}
