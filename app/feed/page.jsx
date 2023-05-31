import Nav from "@components/Nav/Nav";
import React from "react";

const Feed = () => {
  return (
    <div className="main-2 border-2 border-black w-full h-full flex flex-col items-center gap-x-12">
      <Nav links={["Profile"]} />
    </div>
  );
};

export default Feed;
