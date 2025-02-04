"use client";

import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";

interface Translation {
  placeholder: string;
}

const StudentSearchFilter = ({
  translation,
  resetFilterHandler,
}: {
  translation: Translation;
  resetFilterHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterText, setFilterText] = useState("");
  const { placeholder } = translation;

  useEffect(() => {
    // Effect to update the input value when URL search params change
    setFilterText(searchParams.get("name") || "");
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = event.target.value;
    setFilterText(filterText);

    // Create a new URL search query
    const params = new URLSearchParams();
    if (filterText) {
      params.append("name", filterText);
    }
    if (searchParams.get("pageSize")) {
      params.append("pageSize", searchParams.get("pageSize")!);
    }

    // Append query to the router URL
    const query = params.size ? "?" + params.toString() : "";
    router.push("/students/list" + query);
  };

  return (
    <TextField
      size="small"
      value={filterText}
      onChange={handleChange}
      placeholder={placeholder}
      variant="standard"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),

        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={resetFilterHandler}>
              <ClearIcon color="error" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default StudentSearchFilter;
