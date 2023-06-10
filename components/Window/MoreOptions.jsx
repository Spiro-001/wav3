import ConfirmAction from "@components/Modals/ConfirmAction";
import { removePost } from "@redux/features/postSlice";
import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const MoreOptions = ({ options, open, opened, idx }) => {
  const [confirm, setConfirm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [onCompleteFunction, setOnCompleteFunction] = useState(() => {});
  const moreOptionRef = useRef();
  const confirmActionRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const confirmComplete = async () => {
      const data = await onCompleteFunction.function();
      return data;
    };
    if (confirm) {
      confirmComplete();
      dispatch(removePost(idx));
      setConfirm(false);
      setOpenConfirm(false);
    }
  }, [confirm]);

  useOnClickOutside(moreOptionRef, () => {
    open(false);
  });

  const handleOnClickItem = (option) => {
    if (option.confirm) {
      setOnCompleteFunction(option);
      setOpenConfirm(true);
    } else {
      option.function();
      open(false);
    }
  };

  return (
    <>
      <div
        className={`absolute right-0 w-fit whitespace-nowrap dark:bg-neutral-700 bg-white border-gray-100 dark:border-neutral-600 ${
          opened && "border"
        } rounded flex flex-col`}
        ref={moreOptionRef}
      >
        {opened &&
          options.map((option, idx) => (
            <button
              onClick={() => handleOnClickItem(option)}
              className="px-3 py-1 hover:bg-neutral-800 transition-colors"
              key={idx}
            >
              {option.name}
            </button>
          ))}
      </div>
      <ConfirmAction
        ref={confirmActionRef}
        setConfirm={setConfirm}
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
      />
    </>
  );
};

export default MoreOptions;
