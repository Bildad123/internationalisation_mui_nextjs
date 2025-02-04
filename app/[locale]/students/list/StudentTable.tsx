import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslate } from "@/app/Translations";
import { Student } from "@prisma/client";

export interface StudentQuery {
  firstName: string;
  lastName: string;
  name: string;
  orderBy: keyof Student;
  dir: "asc" | "desc";
  page: string;
  pageSize: string;
}

interface Props {
  searchParams: StudentQuery;
  students: Student[];
}

const StudentTable = ({ searchParams, students }: Props) => {
  const translations: {
    label: string;
    value: keyof Student;
    className?: string;
  }[] = [
    {
      label: useTranslate("students.list.studentTable.firstname"),
      value: "firstName",
    },
    {
      label: useTranslate("students.list.studentTable.lastname"),
      value: "lastName",
    },
    {
      label: useTranslate("students.list.studentTable.email"),
      value: "email",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <Table>
      <TableHead>
        <TableRow>
          {translations.map((column) => (
            <TableCell
              key={column.value}
              className={column.className}
              align="left"
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    dir:
                      column.value === searchParams.orderBy
                        ? searchParams.dir === "asc"
                          ? "desc"
                          : "asc"
                        : "asc",
                  },
                }}
                passHref
                legacyBehavior
              >
                <Link underline="none" color="inherit">
                  {column.label}
                  {column.value === searchParams.orderBy &&
                    (searchParams.dir === "asc" ? (
                      <ArrowUpwardIcon fontSize="small" />
                    ) : (
                      <ArrowDownwardIcon fontSize="small" />
                    ))}
                </Link>
              </NextLink>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <NextLink
                href={`/students/${student.id}`}
                passHref
                legacyBehavior
              >
                <Link underline="hover" color="primary">
                  {student.firstName}
                </Link>
              </NextLink>
            </TableCell>
            <TableCell>
              <NextLink
                href={`/students/${student.id}`}
                passHref
                legacyBehavior
              >
                <Link underline="hover" color="primary">
                  {student.lastName}
                </Link>
              </NextLink>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {student.email}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentTable;
