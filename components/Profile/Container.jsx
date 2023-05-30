import React from "react";

const Container = ({ children }) => {
  return (
    <div className="py-4 flex flex-col gap-y-6 h-full border-b border-white flex-1 mb-16 pb-16 relative">
      {children}
    </div>
  );
};

export default Container;
