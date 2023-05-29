import Nav from "@components/Nav/Nav";
import React from "react";

const Feed = () => {
  return (
    <div className="main-2 border-2 border-black w-full h-full flex flex-row flex-wrap items-center justify-center gap-x-12 font-notosans">
      <Nav links={["Profile"]} />
    </div>
  );
};

export default Feed;
