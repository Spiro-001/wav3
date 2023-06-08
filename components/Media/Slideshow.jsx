import ImageModal from "@components/Modals/ImageModal";
import React, { useRef, useState } from "react";

const Slideshow = ({ images }) => {
  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSelect, setImageSelect] = useState(0);

  const moreImages = (idx) => {
    if (!modalRef.current.open) modalRef.current.showModal();
    setImageSelect(idx);
    setModalOpen(true);
  };

  return (
    <div className="max-h-96 flex border border-gray-500 rounded w-full overflow-hidden gap-x-0.5 bg-gray-500">
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        ref={modalRef}
        images={images}
        slideShowCurrent={imageSelect}
        setSlideShowCurrent={setImageSelect}
      />
      {images.length < 4 &&
        images.map((image, idx) => (
          <img
            key={idx}
            src={image.link}
            alt="profile"
            onClick={() => moreImages(idx)}
            className={`object-cover select-none w-1/${images.length}`}
          />
        ))}
      {images.length > 3 &&
        images.map((image, idx) => {
          if (idx < 2)
            return (
              <img
                key={idx}
                src={image.link}
                alt="profile"
                onClick={() => moreImages(idx)}
                className={`object-cover select-none w-1/3 cursor-pointer`}
              />
            );
          if (idx === 2)
            return (
              <div className="relative w-1/3" key={1000}>
                <img
                  key={idx}
                  src={image.link}
                  alt="profile"
                  className={`object-cover select-none`}
                />
                <div
                  onClick={idx === 2 ? () => moreImages(idx) : undefined}
                  className="absolute top-0 bg-gray-800 opacity-80 w-full h-full z-50 cursor-pointer flex justify-center items-center"
                >
                  <span className="text-2xl">{images.length - 2}+</span>
                </div>
              </div>
            );
        })}
    </div>
  );
};

export default Slideshow;
