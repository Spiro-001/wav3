import AddMedia from "@components/EffectBar/AddMedia";
import DragDropFile from "@components/EffectBar/DragDropFile";
import React, { useState } from "react";

const CreatePost = ({ close, modalRef }) => {
  const [body, setBody] = useState("");

  const handleSubmitPost = () => {};
  const cancelPost = (event) => {
    event.preventDefault();
    modalRef.current.close();
    close(false);
  };

  return (
    <form className="h-full w-full" onSubmit={handleSubmitPost}>
      <div className="h-full w-full py-3 px-4 flex flex-col gap-y-2 justify-between">
        <div className="flex justify-between items-center">
          <span className="font-bold">What's on your mind?</span>
          <span className="text-xs bg-white border border-gray-400 px-2 rounded py-0.5">
            {body.length} / 250
          </span>
        </div>
        <DragDropFile />
        <textarea
          maxLength={250}
          className="txt-area w-full border border-gray-400 rounded focus:outline-blue-400 resize-none py-2 px-2 pb-4 text-sm"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <AddMedia />
        <div className="flex justify-between">
          <button
            className="border-2 border-red-500 px-3 rounded-md bg-red-500 text-white font-semibold text-base"
            onClick={cancelPost}
          >
            Cancel
          </button>
          <button
            className="border-2 border-blue-500 px-3 rounded-md bg-blue-500 text-white font-semibold text-base"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
