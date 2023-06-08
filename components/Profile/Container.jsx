import React from "react";

const Container = ({ children }) => {
  return (
    <div className="py-4 flex flex-col gap-y-3 h-full border-b border-black dark:border-white flex-1 mb-16 pb-16 relative">
      {children}
    </div>
  );
};

export default Container;
