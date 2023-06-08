import Image from "next/image";
import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import React, { forwardRef, useRef, useState } from "react";

const ImageModal = forwardRef((props, ref) => {
  const imageRef = useRef();

  useOnClickOutside(imageRef, () => {
    ref.current.close();
    props.setModalOpen(false);
  });

  const handleNextImage = (direction, max) => {
    if (props.slideShowCurrent + direction > max) props.setSlideShowCurrent(0);
    else if (props.slideShowCurrent + direction < 0)
      props.setSlideShowCurrent(max);
    else props.setSlideShowCurrent((prev) => prev + direction);
  };
  return (
    <dialog
      className={`more-image ${
        props.modalOpen && "flex"
      } h-4/6 w-full justify-center bg-transparent overflow-hidden`}
      ref={ref}
    >
      <div
        className="h-full w-2/3 relative border border-gray-50 rounded-md flex items-center"
        ref={imageRef}
      >
        <Image
          width={48}
          height={48}
          src="/PNG/next.png"
          alt="next"
          className="absolute -left-20 cursor-pointer rotate-180"
          onClick={() => handleNextImage(-1, props.images.length - 1)}
        />
        <img
          src={props.images[props.slideShowCurrent].link}
          alt="profile"
          className={`object-cover select-none h-full w-full rounded-md`}
        />
        <Image
          width={48}
          height={48}
          src="/PNG/next.png"
          alt="next"
          className="absolute -right-20 cursor-pointer"
          onClick={() => handleNextImage(1, props.images.length - 1)}
        />
      </div>
    </dialog>
  );
});

export default ImageModal;
