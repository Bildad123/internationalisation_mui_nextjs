import prisma from "@/prisma/client";

import StudentActions from "./StudentActions";
import StudentTable, { StudentQuery } from "./StudentTable";
import { useTranslateAsync } from "@/app/Translations";
import { Student } from "@prisma/client";
import { Box } from "@mui/material";

interface Props {
  searchParams: StudentQuery;
}

const StudentsPage = async ({ searchParams }: Props) => {
  const translationsStudentAction = {
    filter: await useTranslateAsync("students.list.studentActions.filter"),
    resetFilter: await useTranslateAsync(
      "students.list.studentActions.resetFilter"
    ),
    newStudent: await useTranslateAsync(
      "students.list.studentActions.newStudent"
    ),
  };
  const searchFilterTranslations = {
    placeholder: await useTranslateAsync(
      "students.list.studentSearchFilter.placeholder"
    ),
  };

  const studentTableTranslations: {
    label: string;
    value: keyof Student;
    className?: string;
  }[] = [
    {
      label: await useTranslateAsync("students.list.studentTable.firstname"),
      value: "firstName",
    },
    {
      label: await useTranslateAsync("students.list.studentTable.lastname"),
      value: "lastName",
    },
    {
      label: await useTranslateAsync("students.list.studentTable.email"),
      value: "email",
      className: "hidden md:table-cell",
    },
  ];

  const columnNames = studentTableTranslations.map((column) => column.value);

  const name =
    typeof searchParams.name === "string" && searchParams.name.trim().length > 0
      ? searchParams.name.trim()
      : undefined;

  const where = {
    OR: [
      {
        firstName: {
          startsWith: name ? name : "",
        },
      },
      {
        lastName: {
          startsWith: name ? name : "",
        },
      },
    ],
  };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.dir }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pSize = parseInt(searchParams.pageSize) || 10;

  const students = await prisma.student.findMany({
    where,
    orderBy,
    skip: (page - 1) * pSize,
    take: pSize,
  });

  const studentCount = await prisma.student.count({
    where,
  });
  return (
    <Box flexDirection="column" gap="3">
      <StudentActions
        translations={translationsStudentAction}
        searchFilterTranslations={searchFilterTranslations}
      />

      <Box>
        <StudentTable searchParams={searchParams} students={students} />
      </Box>
    </Box>
  );
};

export default StudentsPage;
