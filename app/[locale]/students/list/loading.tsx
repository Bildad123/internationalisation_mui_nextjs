import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const LoadingStudentPage = () => {
  const student = [1, 2, 3, 4, 5];
  return (
    <Box sx={{ padding: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ marginY: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton width={"10rem"} />
              </TableCell>
              <TableCell>
                <Skeleton width={"10rem"} />
              </TableCell>
              <TableCell>
                <Skeleton width="10rem" />
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {student.map((studentItem, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width="10rem" />
                  <Box>
                    <Skeleton variant="text" width="5rem" />
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="8rem" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width="8rem" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoadingStudentPage;
