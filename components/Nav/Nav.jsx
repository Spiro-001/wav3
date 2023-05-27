"use client";

import { signOut } from "next-auth/react";
import React from "react";

const Nav = () => {
  return (
    <nav className="fixed top-0 w-full bg-black border-b-2 flex justify-between h-fit items-center py-3 px-8">
      <span className="text-4xl">wav3</span>
      <ul className="h-fit flex gap-6">
        <span className="nav-link">Profile</span>
        <button onClick={() => signOut()} className="nav-link">
          Sign Out
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
