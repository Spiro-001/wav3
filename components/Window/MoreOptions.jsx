import ConfirmAction from "@components/Modals/ConfirmAction";
import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import React, { useEffect, useRef, useState } from "react";

const MoreOptions = ({ options, open, opened }) => {
  const [confirm, setConfirm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [onCompleteFunction, setOnCompleteFunction] = useState(() => {});
  const moreOptionRef = useRef();
  const confirmActionRef = useRef();

  useEffect(() => {
    const confirmComplete = async () => {
      const data = await onCompleteFunction.function();
      console.log(data);
      return data;
    };
    if (confirm) {
      confirmComplete();
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
      console.log(confirm);
    } else {
      option.function();
      open(false);
    }
  };

  return (
    <>
      <div
        className="absolute right-0 w-fit whitespace-nowrap dark:bg-neutral-700 bg-white border-gray-100 dark:border-neutral-600 border rounded flex flex-col"
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
      />
    </>
  );
};

export default MoreOptions;
