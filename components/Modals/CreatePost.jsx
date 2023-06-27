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
import { uploadSPhotoToS3 } from "@aws/s3_aws";
import { toEmoji } from "@utils/keyboardEmoji/keyboardEmoji";

const CreatePost = ({ openConfirm, setOpenConfirm, close, modalRef }) => {
  const { data: session } = useSession();
  const [body, setBody] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [showLength, setShowLength] = useState(false);
  const [steps, setSteps] = useState(0);
  const [blockAction, setBlockAction] = useState(false);
  const [file, setFile] = useState();

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
    let fileName = [];
    if (file && file.length > 1) {
      fileName = [];
      for (let x = 0; x < file.length; x++) {
        fileName.push(file[x].name);
        await uploadSPhotoToS3(file[x]);
      }
    } else if (file) {
      fileName = [file.name];
      await uploadSPhotoToS3(file);
    }
    const createdNewPost = await postNewPost(
      session.user.id,
      timeNow(),
      timeNow(),
      body,
      file ? [...fileName] : undefined
    ).catch((error) => setSteps((prev) => prev - 1));
    setBlockAction(true);
    // await new Promise((res) => setTimeout(res, 5000));
    if (createdNewPost) {
      dispatch(addNewPost(createdNewPost));
      setOpenConfirm(false);
      cancelPost();
      setConfirm(false);
      setBody("");
      setFile();
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

  const handleTyping = (e) => {
    let a = toEmoji(e.target.value);
    setBody(a);
  };

  const renderSteps = () => {
    switch (steps) {
      case 0:
        return (
          <div className="h-full w-full py-3 px-4 flex flex-col gap-y-2 justify-between relative">
            <div className="flex justify-between items-center">
              <span className="font-bold">What's on your mind?</span>
              {showLength && (
                <span className="text-xs bg-white border border-gray-400 px-2 rounded py-0.5">
                  {body.length} / 250
                </span>
              )}
            </div>
            <DragDropFile setFile={setFile} />
            <textarea
              maxLength={250}
              className="txt-area w-full border border-gray-400 rounded focus:outline-blue-400 resize-none py-2 px-2 pb-4 text-sm break-all"
              value={body}
              onChange={handleTyping}
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
                className="border border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400"
                onClick={handleNextStep}
                disabled={body.length === 0}
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
              className="select-none"
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
        blockAction={blockAction}
      />
    </>
  );
};

export default CreatePost;
