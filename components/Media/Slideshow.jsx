import React from "react";

const Slideshow = ({ images }) => {
  return (
    <div className="max-h-96 flex border border-gray-500 rounded w-full overflow-hidden gap-x-0.5 bg-gray-500">
      {images.map((image, idx) => (
        <img
          key={idx}
          src="https://picsum.photos/1920/1080"
          alt="profile"
          className={`object-cover select-none w-1/${images.length}`}
        />
      ))}
    </div>
  );
};

export default Slideshow;
