"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StudentSearchFilter from "./StudentSearchFilter";
import { Grid, Box,Typography, Button } from "@mui/material";

interface Translations {
  filter: string;
  resetFilter: string;
  newStudent: string;
}

interface SearchFilterTranslations {
  placeholder: string;
}

interface Props {
  translations: Translations;
  searchFilterTranslations: SearchFilterTranslations;
}

const StudentActions = ({ translations, searchFilterTranslations }: Props) => {
  const { newStudent } = translations;
  const [resetKey, setResetKey] = useState(0); // State für den Schlüssel
  const router = useRouter();
  const handleResetFilter = () => {
    // Erhöhe den Schlüssel, um die Komponente neu zu laden
    setResetKey((prevKey) => prevKey + 1);

    router.push("/students/list");
  };
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={8}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          my={2}
          maxWidth={1000}
        >
          <StudentSearchFilter
            translation={searchFilterTranslations}
            key={resetKey}
            resetFilterHandler={handleResetFilter}
          />
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box display="flex" justifyContent="center">
          <Link href={"/students/new"}>
            {" "}
            <Button variant="outlined" color="primary" sx={{my : {xs : 0.5, md:2}}}>
              <Typography color="inherit">{newStudent}</Typography>
            </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};
export default StudentActions;
