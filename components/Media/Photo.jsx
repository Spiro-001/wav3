import React from "react";

const Photo = () => {
  return (
    <div className="max-h-96 flex border-gray-400 rounded">
      <img
        src="https://picsum.photos/1920/1080"
        alt="profile"
        className="object-cover rounded select-none"
      />
    </div>
  );
};

export default Photo;
