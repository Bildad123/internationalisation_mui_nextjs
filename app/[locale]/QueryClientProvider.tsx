"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useColorMode } from "./components/ColorModeProvider";
import { ThemeProvider, useTheme } from "@mui/material/styles";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const colorMode = useColorMode();
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
