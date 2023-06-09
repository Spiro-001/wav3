"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const Provider = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) setPrefersDark(true);
  }, [mounted]);

  const darkTheme = createTheme({
    palette: {
      mode: prefersDark ? "dark" : "light",
    },
  });

  return (
    mounted && (
      <ThemeProvider theme={darkTheme}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    )
  );
};

export default Provider;
