import AddMedia from "@components/EffectBar/AddMedia";
import DragDropFile from "@components/EffectBar/DragDropFile";
import React, { useEffect, useRef, useState } from "react";
import ConfirmAction from "./ConfirmAction";
import Image from "next/image";
import { postNewPost } from "@utils/fetch/post/post/postNewPost";
import { useSession } from "next-auth/react";
import { timeNow } from "@utils/numbers/dateAgoFormat";
import { useDispatch } from "react-redux";
import { addNewPost } from "@redux/features/postSlice";

const CreatePost = ({ openConfirm, setOpenConfirm, close, modalRef }) => {
  const { data: session } = useSession();
  const [body, setBody] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [showLength, setShowLength] = useState(false);
  const [steps, setSteps] = useState(0);
  const confirmRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (confirm) {
      cancelPost();
      setOpenConfirm(false);
      setConfirm(false);
      setBody("");
    }
  }, [confirm]);

  const handleSubmitPost = async () => {
    const createdNewPost = await postNewPost(
      session.user.id,
      timeNow(),
      timeNow(),
      body
    );
    if (createdNewPost) {
      dispatch(addNewPost(createdNewPost));
      cancelPost();
      setOpenConfirm(false);
      setConfirm(false);
      setBody("");
    }
  };

  const confirmCancel = (event) => {
    event.preventDefault();
    setOpenConfirm(true);
  };

  const cancelPost = () => {
    modalRef.current.close();
    close(false);
  };

  const handleNextStep = () => {
    setSteps((prev) => prev + 1);
    handleSubmitPost();
  };

  const renderSteps = () => {
    switch (steps) {
      case 0:
        return (
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
                onClick={handleNextStep}
              >
                Post
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="h-full w-full flex justify-center items-center">
            <Image
              src="/GIF/loading.gif"
              width={48}
              height={48}
              alt="loading"
            />
          </div>
        );
    }
  };

  return (
    <>
      <form className="h-full w-full" onSubmit={handleSubmitPost}>
        {renderSteps()}
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
