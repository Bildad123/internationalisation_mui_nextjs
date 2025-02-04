"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
  Paper,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Box,
  Checkbox,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import NextLink from "next/link";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslate } from "@/app/Translations";
import { Student } from "@prisma/client";
import { visuallyHidden } from "@mui/utils";

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  // Handle Date comparison
  if (aValue instanceof Date && bValue instanceof Date) {
    return bValue.getTime() - aValue.getTime();
  }

  // General comparison for other fields (numbers or strings)
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const StudentTable = ({ students }: Props) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Student>("firstName");

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
    },
    {
      label: useTranslate("students.list.studentTable.gender"),
      value: "gender",
    },
    {
      label: useTranslate("students.list.studentTable.semester"),
      value: "semester",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Student
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(
    () =>
      students
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [students, order, orderBy, page, rowsPerPage]
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {translations.map((column) => (
                <TableCell key={column.value} align="left">
                  <TableSortLabel
                    active={orderBy === column.value}
                    direction={orderBy === column.value ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, column.value)}
                  >
                    {column.label}
                    {orderBy === column.value ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((student) => (
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
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.semester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StudentTable;
