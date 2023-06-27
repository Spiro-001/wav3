import { getSPhotoFromS3 } from "@aws/s3_aws";
import ImageModal from "@components/Modals/ImageModal";
import React, { useEffect, useRef, useState } from "react";

const Photo = ({ images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSelect, setImageSelect] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const modalRef = useRef();

  const moreImages = () => {
    if (!modalRef.current.open) modalRef.current.showModal();
    setImageSelect(0);
    setModalOpen(true);
  };

  useEffect(() => {
    const getImage = async () => {
      var imageURL = await getSPhotoFromS3(images[0]);
      setImageLink(imageURL);
    };
    getImage();
  });

  return (
    <div className="max-h-96 flex h-96 border-gray-400 border rounded w-fit justify-start items-start flex-col">
      <ImageModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        ref={modalRef}
        images={[imageLink]}
        slideShowCurrent={imageSelect}
        setSlideShowCurrent={setImageSelect}
      />
      <img
        src={imageLink}
        alt="profile"
        className="object-contain rounded select-none h-full cursor-pointer"
        onClick={moreImages}
      />
    </div>
  );
};

export default Photo;
