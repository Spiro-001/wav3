import ImageModal from "@components/Modals/ImageModal";
import React, { useRef, useState } from "react";

const Slideshow = ({ images }) => {
  const modalRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  const moreImages = () => {
    modalRef.current.showModal();
    setModalOpen(true);
  };

  return (
    <div className="max-h-96 flex border border-gray-500 rounded w-full overflow-hidden gap-x-0.5 bg-gray-500">
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        ref={modalRef}
        images={images}
      />
      {images.length < 4 &&
        images.map((image, idx) => (
          <img
            key={idx}
            src={image.link}
            alt="profile"
            className={`object-cover select-none w-1/${images.length}`}
          />
        ))}
      {images.length > 3 &&
        images.map((image, idx) => (
          <img
            key={idx}
            src={image.link}
            alt="profile"
            onClick={idx === 2 ? moreImages : undefined}
            className={`object-cover select-none w-1/3 ${
              idx === 2 && "cursor-pointer"
            }`}
          />
        ))}
    </div>
  );
};

export default Slideshow;
