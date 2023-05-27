"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const Provider = ({ children, session }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [mounted]);
  return (
    mounted && <SessionProvider session={session}>{children}</SessionProvider>
  );
};

export default Provider;
