import React, { forwardRef, useEffect, useRef } from "react";

const ConfirmAction = forwardRef((props, ref) => {
  const confirmContainerRef = useRef();

  useEffect(() => {
    if (props.openConfirm && !ref.current.open) ref.current.showModal();
  }, [props.openConfirm]);

  const confirmCancel = () => {
    ref.current.close();
    props.setConfirm(true);
  };

  const cancelAction = () => {
    ref.current.close();
    props.setConfirm(false);
    props.setOpenConfirm(false);
  };

  return (
    <dialog className="bg-transparent" ref={ref}>
      <div
        ref={confirmContainerRef}
        className="border border-gray-400 rounded-md px-4 bg-white flex flex-col items-end gap-y-8 py-2"
      >
        <span className="text-md font-semibold">
          Are you sure you want to cancel this post?
        </span>
        <div className="flex gap-x-2 text-base">
          <button
            className="text-gray-400 px-2 rounded-md"
            onClick={cancelAction}
          >
            Cancel
          </button>
          <button
            className="border border-blue-500 px-2 rounded-md bg-blue-500 text-white font-semibold"
            onClick={confirmCancel}
          >
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default ConfirmAction;
