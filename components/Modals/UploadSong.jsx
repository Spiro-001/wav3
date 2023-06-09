import Dropdown from "@components/Dropdown/Dropdown";
import DragDropSong from "@components/EffectBar/DragDropSong";
import React, { useEffect, useRef, useState } from "react";
import ConfirmAction from "./ConfirmAction";
import Image from "next/image";

const UploadSong = ({ openConfirm, setOpenConfirm, close, modalRef }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showLength, setShowLength] = useState(false);
  const [tag, setTag] = useState(null);
  const [maxLength, setMaxLength] = useState(0);
  const [step, setStep] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [errors, setErrors] = useState({
    title: null,
  });
  const currentFocusRef = useRef(null);
  const confirmRef = useRef();

  useEffect(() => {
    if (confirm) {
      cancelPost();
      setOpenConfirm(false);
      setConfirm(false);
      setTitle("");
      setDescription("");
      setTag(null);
      setStep(0);
    }
  }, [confirm]);

  const handleUploadSong = () => {};

  const onChangeTitle = (e) => {
    currentFocusRef.current = e.target.value;
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    currentFocusRef.current = e.target.value;
    setDescription(e.target.value);
  };

  const confirmCancel = (event) => {
    event.preventDefault();
    setOpenConfirm(true);
  };

  const cancelPost = () => {
    modalRef.current.close();
    close(false);
  };

  const checkTitle = (title) => {
    if (title.length === 0) setErrors({ title: "Please enter a title." });
    else setErrors({ title: null });
  };

  const renderSteps = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="h-full w-full py-3 px-4 flex flex-col gap-y-1 justify-between">
              <div className="flex justify-between items-center">
                <span className="font-bold mb-1">Upload a new song!</span>
                {showLength && (
                  <span className="text-xs bg-white border border-gray-400 px-2 rounded py-0.5">
                    {currentFocusRef.current.length + " / " + maxLength}
                  </span>
                )}
              </div>
              <DragDropSong />
              <div className="flex leading-tight text-base gap-x-1">
                <input
                  className={`border w-7/12 px-3 py-2 ${
                    errors.title
                      ? "border-red-500 outline-red-400"
                      : "outline-blue-400"
                  } outline-1 rounded-sm placeholder:text-gray-400 text-sm`}
                  placeholder="Song Title"
                  value={title}
                  onChange={(e) => {
                    onChangeTitle(e);
                    setErrors({ title: null });
                  }}
                  onFocus={() => {
                    currentFocusRef.current = title;
                    setMaxLength(30);
                    setShowLength(true);
                    checkTitle(title);
                  }}
                  onBlur={() => {
                    currentFocusRef.current = null;
                    setShowLength(false);
                    setMaxLength(0);
                    checkTitle(title);
                  }}
                />
                <Dropdown
                  items={[
                    "Hip-hop",
                    "Rock",
                    "Heavy metal",
                    "Pop",
                    "R&B",
                    "Country",
                    "Alternative",
                    "Techno",
                    "Jazz",
                    "EDM",
                    "Indie rock",
                    "Punk Rock",
                  ]}
                  selectedItem={tag}
                  setSelectedItem={setTag}
                />
              </div>
              <textarea
                className="resize-none h-full py-2 border px-3 placeholder:text-gray-400 outline-blue-400 outline-1 mb-2 rounded-sm text-sm"
                placeholder="Song Description..."
                onChange={onChangeDescription}
                onFocus={() => {
                  currentFocusRef.current = description;
                  setMaxLength(250);
                  setShowLength(true);
                }}
                onBlur={() => {
                  currentFocusRef.current = null;
                  setShowLength(false);
                  setMaxLength(0);
                }}
                maxLength={250}
              />
              <div className="flex justify-between mt-auto">
                <button
                  className="px-3 rounded-md text-gray-400 text-base hover:text-black transition-colors"
                  onClick={confirmCancel}
                >
                  Cancel
                </button>
                <button
                  className="border border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base disabled:cursor-not-allowed"
                  onClick={() => setStep((prev) => prev + 1)}
                  disabled={title.length === 0 ? true : false}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="h-full w-full py-3 px-4 flex flex-col gap-y-1 justify-between">
              <div className="flex justify-between items-center">
                <span className="font-bold mb-1">Upload a photo!</span>
                {showLength && (
                  <span className="text-xs bg-white border border-gray-400 px-2 rounded py-0.5">
                    {currentFocusRef.current.length + " / " + maxLength}
                  </span>
                )}
              </div>
              <DragDropSong />
              <div className="flex justify-between mt-auto">
                <button
                  className="px-3 rounded-md text-gray-400 text-base hover:text-black transition-colors"
                  onClick={confirmCancel}
                >
                  Cancel
                </button>
                <button
                  className="border border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base"
                  onClick={() => setStep((prev) => prev + 1)}
                >
                  Post
                </button>
              </div>
            </div>
          </>
        );
      case 2:
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
      default:
        return null;
    }
  };

  return (
    <>
      <form className="h-full w-full" onSubmit={handleUploadSong}>
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

export default UploadSong;
