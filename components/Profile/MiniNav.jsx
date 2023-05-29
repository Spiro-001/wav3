import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

const MiniNav = (props) => {
  const sectionList = [
    "Bio",
    "Featured tracks",
    "Tracks",
    "Albums",
    "Playlist",
    "Highlight",
  ];

  const selectorRef = useRef();

  const handleSectionClick = (idx) => {
    if (props.selector !== idx) {
      const getWidth = document.getElementById(idx);
      console.log(getWidth.offsetLeft);
      props.setSelector(idx);
      gsap.to(selectorRef.current, {
        width: getWidth,
        left: getWidth.offsetLeft,
        duration: 0.2,
      });
      gsap.to(selectorRef.current, {
        width: getWidth,
        duration: 0.2,
        delay: 2,
      });
    }
  };

  useLayoutEffect(() => {
    const getWidth = document.getElementById(props.selector);
    gsap.to(selectorRef.current, {
      width: getWidth.clientWidth,
      duration: 0.1,
    });
  });

  return (
    <div className="w-full border-white border-b flex gap-x-8 text-xl pt-4 px-2 pb-1 relative">
      <span
        className="absolute border-b-2 border-red-500 bottom-1 rounded-full"
        ref={selectorRef}
      ></span>
      {sectionList.map((section, idx) => (
        <span
          key={idx}
          onClick={() => handleSectionClick(idx)}
          id={idx}
          className="cursor-pointer"
        >
          {section}
        </span>
      ))}
    </div>
  );
};

export default MiniNav;
