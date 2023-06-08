import UserAction from "@components/Modals/UserAction";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useRef, useState } from "react";

const MiniNav = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const sectionList = [
    "Bio",
    "Featured tracks",
    "Tracks",
    "Albums",
    "Playlist",
    "Highlight",
    "Media",
  ];

  const userActionList = ["Create a post", "Upload a song"];

  const selectorRef = useRef();

  const handleSectionClick = (idx) => {
    if (props.selector !== idx) {
      const getWidth = document.getElementById(idx);
      props.setSelector(idx);
      gsap.to(selectorRef.current, {
        width: getWidth,
        duration: 0.2,
      });
      gsap.to(selectorRef.current, {
        width: getWidth,
        duration: 0.2,
        delay: 2,
      });
      router.push(`/profile?tab=${idx}`);
    }
  };

  const handleUserActionClick = () => {
    setOpenModal(true);
  };

  useLayoutEffect(() => {
    const getWidth = document.getElementById(props.selector);
    gsap.to(selectorRef.current, {
      left: getWidth.offsetLeft,
      width: getWidth.clientWidth,
      duration: 0.2,
    });
  });

  return (
    <div className="min-w-fit w-full border-black dark:border-white border-b flex gap-x-8 text-xl pt-4 px-2 pb-1 relative items-center">
      <span
        className="absolute border-b-2 border-red-500 bottom-1 rounded-full"
        ref={selectorRef}
      ></span>
      {sectionList.map((section, idx) => (
        <span
          key={idx}
          onClick={() => handleSectionClick(idx)}
          id={idx}
          className="cursor-pointer whitespace-nowrap"
        >
          {section}
        </span>
      ))}
      <span
        onClick={handleUserActionClick}
        className="cursor-pointer whitespace-nowrap text-3xl leading-3 ml-auto"
      >
        +
      </span>
      <UserAction open={openModal} close={setOpenModal} />
    </div>
  );
};

export default MiniNav;
