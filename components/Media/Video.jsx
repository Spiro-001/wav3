import React from "react";

const Video = () => {
  return (
    <div className="max-h-[500px] flex bg-white rounded-md overflow-hidden border border-white">
      <iframe
        src="https://www.youtube.com/embed/zGDzdps75ns"
        width="100%"
        height="506px"
      />
    </div>
  );
};

export default Video;
