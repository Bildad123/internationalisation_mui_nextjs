import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Student, Gender } from "@prisma/client"; // Import Gender enum from Prisma

// Function to group students by gender
const groupStudentsByGender = (students: Student[]) => {
  const genderData = { male: 0, female: 0 };

  students.forEach((student) => {
    if (student.gender === Gender.Male) {
      genderData.male++;
    } else if (student.gender === Gender.Female) {
      genderData.female++;
    }
  });

  return genderData;
};

export default function DashboardPieChart({
  students,
}: {
  students: Student[];
}) {
  // Group students by gender
  const genderData = groupStudentsByGender(students);

  // Prepare data for the Pie chart
  const pieData = [
    { label: "Male Students", value: genderData.male },
    { label: "Female Students", value: genderData.female },
  ];

  return (
    <PieChart
      series={[
        {
          startAngle: -90, // Start angle of the chart (rotation)
          endAngle: 90, // End angle (90 degrees here for a half pie chart)
          data: pieData, // Data for the pie chart
        },
      ]}
      height={300} // Height of the Pie chart
    />
  );
}
