import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
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

export default function DashboardLineChart({
  students,
}: {
  students: Student[];
}) {
  // Group students by semester and gender
  const groupedData = groupStudentsBySemesterAndGender(students);

  // Extracting the semesters and corresponding student counts by gender
  const semesters = Object.keys(groupedData).map(Number);
  const maleData = semesters.map((sem) => groupedData[sem].male);
  const femaleData = semesters.map((sem) => groupedData[sem].female);

  return (
    <LineChart
      width={600}
      height={300}
      series={[
        { data: maleData, label: "Male Students" },
        { data: femaleData, label: "Female Students" },
      ]}
      xAxis={[{ scaleType: "point", data: semesters.map(String) }]} // Using semesters as x-axis labels
    />
  );
}
