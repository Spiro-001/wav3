"use client";

import Nav from "@components/Nav/Nav";
import Profile from "@components/Profile/Profile";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="main-2 border-2 border-black w-full h-full flex flex-col items-center font-notosans box-border">
      <Nav links={["Profile"]} />
      <Profile session={session} />
    </div>
  );
};

export default page;
