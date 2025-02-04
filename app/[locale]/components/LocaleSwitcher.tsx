"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Link } from "@/navigation";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";

export default function LocaleSwitcher() {
  // Get the current pathname
  const path = usePathname();

  // Supported languages to remove
  const supportedLanguages = ["en", "de"];

  // Extract the remaining path after removing the language prefix
  let remainingPath = path;

  // Handle single language code prefixes (e.g., "/en", "/de")
  if (supportedLanguages.includes(path.slice(1))) {
    // Check for language code after slash
    remainingPath = "/";
  } else {
    // Loop through remaining cases (paths with trailing slashes or no prefix)
    for (const language of supportedLanguages) {
      if (path.startsWith(`/${language}`)) {
        remainingPath = path.slice(language.length + 1); // Remove language + slash
        break; // Stop after the first match
      }
    }
  }

  // Get search parameters
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  const status = searchParams.get("status");
  const level = searchParams.get("level");
  const assignOption = searchParams.get("assignOption");
  const title = searchParams.get("title");
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const rst = searchParams.get("rst");
  const dir = searchParams.get("dir");
  const name = searchParams.get("name");

  // Construct query parameters object
  const queryParams: any = {};
  if (orderBy) {
    queryParams.orderBy = orderBy;
  }
  if (status) {
    queryParams.status = status;
  }
  if (level) {
    queryParams.level = level;
  }
  if (assignOption) {
    queryParams.assignOption = assignOption;
  }
  if (title) {
    queryParams.title = title;
  }
  if (pageSize) {
    queryParams.pageSize = pageSize;
  }
  if (rst) {
    queryParams.rst = rst;
  }
  if (dir) {
    queryParams.dir = dir;
  }
  if (name) {
    queryParams.name = name;
  }
  if (page) {
    queryParams.page = page;
  }

  // Convert query parameters object to query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Append query string to the remaining path if it exists
  if (queryString) {
    remainingPath += "?" + queryString;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <MuiLink
        underline={path.includes("/en") ? "always" : "none"}
        href={remainingPath}
        component={Link}
        locale={"en"}
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        English
      </MuiLink>

      <MuiLink
        underline={path.includes("/de") ? "always" : "none"}
        href={remainingPath}
        component={Link}
        locale={"de"}
        color="inherit"
        sx={{ display: "flex", alignItems: "center" }}
      >
        Deutsch
      </MuiLink>
    </Breadcrumbs>
  );
}
