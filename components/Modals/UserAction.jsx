import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import React, { useEffect, useRef, useState } from "react";
import CreatePost from "./CreatePost";
import UploadSong from "./UploadSong";
import Image from "next/image";

const UserAction = ({ open, close }) => {
  const [option, setOption] = useState(0);
  const [openConfirm, setOpenConfirm] = useState(false);
  const userActionRef = useRef();
  const contentActionRef = useRef();

  useOnClickOutside(contentActionRef, () => {
    if (userActionRef.current.open && option !== 0) setOpenConfirm(true);
    else {
      close(false);
    }
  });

  useEffect(() => {
    if (open && !userActionRef.current.open) {
      userActionRef.current.showModal();
      document.getElementsByTagName("HTML")[0].style.overflowY = "hidden";
    } else {
      userActionRef.current.close();
      document.getElementsByTagName("HTML")[0].style.overflowY = "auto";
      setOption(0);
    }
  }, [open]);

  return (
    <dialog
      ref={userActionRef}
      className="bg-transparent h-2/4 w-full justify-center"
    >
      <div
        ref={contentActionRef}
        className="rounded-md bg-white h-full w-96 mx-auto flex flex-col gap-y-2 justify-center items-center cursor-pointer"
      >
        {option === 0 && (
          <>
            <div
              className="border-2 border-black h-48 w-48 rounded flex justify-center items-center bg-orange-200 gap-x-1"
              onClick={() => setOption(1)}
            >
              <Image
                src="/PNG/new-postv2.png"
                alt="add-song"
                width={48}
                height={48}
              />
              <span className="text-sm">Make a post</span>
            </div>
            <div
              className="border-2 border-black h-48 w-48 rounded flex justify-center items-center gap-x-1 cursor-pointer"
              onClick={() => setOption(2)}
            >
              <Image
                src="/PNG/song.png"
                alt="add-song"
                width={48}
                height={48}
              />
              <span className="text-sm">Upload a song</span>
            </div>
          </>
        )}
        {option === 1 && (
          <CreatePost
            close={close}
            modalRef={userActionRef}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
          />
        )}
        {option === 2 && (
          <UploadSong
            close={close}
            modalRef={userActionRef}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
          />
        )}
      </div>
    </dialog>
  );
};

export default UserAction;
