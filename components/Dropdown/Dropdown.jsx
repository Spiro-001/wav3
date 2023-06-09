import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Dropdown = ({ items, setSelectedItem, selectedItem }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownMenuRef = useRef();

  const handleOpenDropdown = () => {
    setOpenDropDown((prev) => !prev);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setOpenDropDown(false);
  };

  useOnClickOutside(dropdownMenuRef, () => setOpenDropDown(false));
  return (
    <div className="flex-1 relative" ref={dropdownMenuRef}>
      <div
        className="flex flex-1 relative items-center cursor-pointer box-border outline-blue-400"
        onClick={handleOpenDropdown}
      >
        <div
          className={`drop-down border w-full px-3 py-2 rounded-sm whitespace-nowrap ${
            selectedItem ? "text-black" : "text-gray-400"
          } ${openDropDown ? "shadow-blue-400" : "shadow-none"}`}
        >
          {selectedItem ? selectedItem : "Tag"}
        </div>
        <Image
          src="/SVG/icons8-collapse-arrow-50.png"
          alt="drop-down"
          width={12}
          height={12}
          className="rotate-180 w-3.5 h-3.5 object-contain absolute right-3"
        />
      </div>
      {openDropDown && (
        <div className="absolute bg-white border max-h-48 flex flex-col min-w-fit w-full overflow-y-auto overflow-x-hidden shadow">
          {items.map((item) => (
            <span
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm whitespace-nowrap transition-all"
              onClick={() => handleItemSelect(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
