import AddMedia from "@components/EffectBar/AddMedia";
import DragDropFile from "@components/EffectBar/DragDropFile";
import React, { useEffect, useRef, useState } from "react";
import ConfirmAction from "./ConfirmAction";

const CreatePost = ({ openConfirm, setOpenConfirm, close, modalRef }) => {
  const [body, setBody] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [showLength, setShowLength] = useState(false);
  const confirmRef = useRef();

  useEffect(() => {
    if (confirm) {
      cancelPost();
      setOpenConfirm(false);
      setConfirm(false);
      setBody("");
    }
  }, [confirm]);

  const handleSubmitPost = () => {};

  const confirmCancel = (event) => {
    event.preventDefault();
    setOpenConfirm(true);
  };

  const cancelPost = () => {
    modalRef.current.close();
    close(false);
  };

  return (
    <>
      <form className="h-full w-full" onSubmit={handleSubmitPost}>
        <div className="h-full w-full py-3 px-4 flex flex-col gap-y-2 justify-between">
          <div className="flex justify-between items-center">
            <span className="font-bold">What's on your mind?</span>
            {showLength && (
              <span className="text-xs bg-white border border-gray-400 px-2 rounded py-0.5">
                {body.length} / 250
              </span>
            )}
          </div>
          <DragDropFile />
          <textarea
            maxLength={250}
            className="txt-area w-full border border-gray-400 rounded focus:outline-blue-400 resize-none py-2 px-2 pb-4 text-sm"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setShowLength(true)}
            onBlur={() => setShowLength(false)}
          />
          <AddMedia />
          <div className="flex justify-between">
            <button
              className="px-3 rounded-md text-gray-400 text-base hover:text-black transition-colors"
              onClick={confirmCancel}
            >
              Cancel
            </button>
            <button
              className="border border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
      <ConfirmAction
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        setConfirm={setConfirm}
        ref={confirmRef}
      />
    </>
  );
};

export default CreatePost;
