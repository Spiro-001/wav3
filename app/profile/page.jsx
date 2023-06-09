"use client";

import Nav from "@components/Nav/Nav";
import Profile from "@components/Profile/Profile";
import { timeNow } from "@utils/numbers/dateAgoFormat";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="main-2 max-sm:w-fit w-full h-full flex flex-col sm:items-center box-border">
      <Nav links={["Profile"]} />
      {session && <Profile session={session} />}
    </div>
  );
};

export default page;
