import DragDropSong from "@components/EffectBar/DragDropSong";
import React, { useRef, useState } from "react";

const UploadSong = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showLength, setShowLength] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const currentFocusRef = useRef(null);

  const handleUploadSong = () => {};
  const onChangeTitle = (e) => {
    currentFocusRef.current = e.target.value;
    setTitle(e.target.value);
  };
  const onChangeDescription = (e) => {
    currentFocusRef.current = e.target.value;
    setDescription(e.target.value);
  };

  return (
    <>
      <form className="h-full w-full" onSubmit={handleUploadSong}>
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
              className="border w-3/4 px-2 py-2 outline-blue-400 outline-1 rounded-sm"
              placeholder="title"
              value={title}
              onChange={onChangeTitle}
              onFocus={() => {
                currentFocusRef.current = title;
                setMaxLength(30);
                setShowLength(true);
              }}
              onBlur={() => {
                currentFocusRef.current = null;
                setShowLength(false);
                setMaxLength(0);
              }}
            />
            <input
              className="border w-1/4 px-2 py-2 outline-blue-400 outline-1 rounded-sm"
              placeholder="tag"
            />
          </div>
          <textarea
            className="resize-none h-full py-2 border text-base px-2 outline-blue-400 outline-1 mb-2 rounded-sm"
            placeholder="description"
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
          />
          <div className="flex justify-between mt-auto">
            <button
              className="px-3 rounded-md text-gray-400 text-base hover:text-black transition-colors"
              // onClick={confirmCancel}
            >
              Cancel
            </button>
            <button
              className="border border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base"
              type="submit"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadSong;
