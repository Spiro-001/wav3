import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import React, { useEffect, useRef } from "react";
import CreatePost from "./CreatePost";

const UserAction = ({ open, close }) => {
  const userActionRef = useRef();
  const contentActionRef = useRef();

  useOnClickOutside(contentActionRef, () => {
    userActionRef?.current.close();
    close(false);
  });

  useEffect(() => {
    if (open && !userActionRef.current.open) userActionRef.current.showModal();
  }, [open]);

  return (
    <dialog ref={userActionRef} className="bg-transparent h-2/4 w-96">
      <div ref={contentActionRef} className="rounded-md bg-white h-full w-full">
        <CreatePost close={close} modalRef={userActionRef} />
      </div>
    </dialog>
  );
};

export default UserAction;
