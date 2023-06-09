"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Nav = (props) => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 w-full flex justify-between h-fit items-center py-1.5 px-8 z-50 shadow-md">
      <span
        className="text-2xl cursor-pointer"
        onClick={() => router.push("/feed")}
      >
        wav3
      </span>
      <ul className="h-fit flex gap-3">
        {props.links.map((link, idx) => (
          <button
            key={idx}
            onClick={() => router.push(`/${link.toLowerCase()}`)}
            className="nav-link"
          >
            {link}
          </button>
        ))}
        <button onClick={() => signOut()} className="nav-link">
          Sign Out
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
