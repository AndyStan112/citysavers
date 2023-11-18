"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createTheme, ThemeProvider } from "@mui/material";
import IndexLayout from "./indexLayout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#1976d2",
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CitySavers</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <IndexLayout>{children}</IndexLayout>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
