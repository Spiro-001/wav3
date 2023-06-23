import { getSPhotoFromS3 } from "@aws/s3_aws";
import ImageModal from "@components/Modals/ImageModal";
import React, { useEffect, useRef, useState } from "react";

const Slideshow = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSelect, setImageSelect] = useState(0);
  const [imageLinks, setImageLinks] = useState([]);
  const modalRef = useRef();

  const moreImages = (idx) => {
    if (!modalRef.current.open) modalRef.current.showModal();
    setImageSelect(idx);
    setModalOpen(true);
  };

  useEffect(() => {
    const getImage = async () => {
      images.forEach(async (image) => {
        await getSPhotoFromS3(image).then((url) => {
          setImageLinks((prev) => [...prev, url]);
        });
      });
    };
    getImage();
  }, []);

  return (
    <div className="max-h-96 h-96 flex border border-gray-500 rounded overflow-hidden gap-x-0.5 bg-transparent w-fit">
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        ref={modalRef}
        images={images}
        slideShowCurrent={imageSelect}
        setSlideShowCurrent={setImageSelect}
      />
      {imageLinks.length < 4 &&
        imageLinks.map((image, idx) => (
          <img
            key={idx}
            src={image}
            alt="profile"
            onClick={() => moreImages(idx)}
            className={`object-contain select-none w-1/${images.length}`}
          />
        ))}
      {imageLinks.length > 3 &&
        imageLinks.map((image, idx) => {
          if (idx < 2)
            return (
              <img
                key={idx}
                src={image}
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
                  src={image}
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
