"use client";

import rangeList from "@utils/range/range";
import useOnClickOutside from "@utils/useOnClickOutside/useOnClickOutside";
import validateDate from "@utils/validateDate/validateDate";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const DOBDropdown = (props) => {
  const [openMonthMenu, setOpenMonthMenu] = useState(false);
  const [openDayMenu, setOpenDayMenu] = useState(false);
  const [openYearMenu, setOpenYearMenu] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState(31);

  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [1900, new Date().getFullYear()];

  const handleOpenMenu = (event) => {
    const { target } = event;
    let dateValid;
    switch (target.id) {
      case "month":
        dateValid = validateDate(months.indexOf(target.innerText), props.year);
        props.setMonth(months.indexOf(target.innerText));
        setDaysInMonth(dateValid);
        if (props.day && parseInt(props.day) >= dateValid) props.setDay();
        break;
      case "day":
        props.setDay(target.innerText);
        break;
      case "year":
        dateValid = validateDate(props.month, target.innerText);
        props.setYear(target.innerText);
        setDaysInMonth(dateValid);
        if (props.day && parseInt(props.day) >= dateValid) props.setDay();
        break;
    }
  };

  useOnClickOutside(monthRef, () => {
    setOpenMonthMenu(false);
  });

  useOnClickOutside(dayRef, () => {
    setOpenDayMenu(false);
  });

  useOnClickOutside(yearRef, () => {
    setOpenYearMenu(false);
  });

  return (
    <div className="flex gap-x-2">
      <div
        className="month-container flex flex-col bg-white relative w-1/3 sm:w-fit"
        ref={monthRef}
        onClick={() => {
          setOpenMonthMenu((prev) => !prev);
        }}
      >
        <span
          className={`border-2 h-14 sm:w-52 text-sm pl-2 py-0.5 w-full rounded-md flex flex-col hover:cursor-pointer ${
            openMonthMenu
              ? "border-blue-500"
              : props.month
              ? "border-blue-500"
              : "border-gray-200"
          }`}
        >
          Month
          <span className="text-base font-bold">{months[props.month]}</span>
          <span className="h-full absolute right-4 top-0 flex items-center">
            <Image
              src="/SVG/icons8-collapse-arrow-50.png"
              alt="drop-down"
              width={16}
              height={16}
              className="rotate-180 w-4 h-4 object-contain"
            />
          </span>
        </span>
        {openMonthMenu && (
          <div className="flex flex-col absolute overflow-y-auto overflow-x-hidden max-h-80 w-full bg-white top-full border-2 border-gray-400">
            {months.map((mth, mthIdx) => (
              <span
                key={mth}
                onClick={handleOpenMenu}
                onMouseEnter={(event) => (event.target.id = "month")}
                id={props.month === mthIdx ? "selected-month" : "month"}
                className="font-normal px-2 hover:cursor-default"
              >
                {mth}
              </span>
            ))}
          </div>
        )}
      </div>
      <div
        className="day-container flex flex-col bg-white relative"
        ref={dayRef}
        onClick={() => {
          setOpenDayMenu((prev) => !prev);
        }}
      >
        <span
          className={`border-2 h-14 w-24 text-sm pl-2 py-0.5 rounded-md flex flex-col justify-between hover:cursor-pointer ${
            openDayMenu
              ? "border-blue-500"
              : props.day
              ? "border-blue-500"
              : "border-gray-200"
          }`}
        >
          Day
          <span className="text-base font-bold">{props.day}</span>
          <span className="h-full absolute right-4 top-0 flex items-center">
            <Image
              src="/SVG/icons8-collapse-arrow-50.png"
              alt="drop-down"
              width={16}
              height={16}
              className="rotate-180 w-4 h-4 object-contain"
            />
          </span>
        </span>
        {openDayMenu && (
          <div className="flex flex-col absolute overflow-y-auto overflow-x-hidden max-h-80 w-full bg-white top-full border-2 border-gray-400">
            {rangeList(1, daysInMonth).map((dy, dayIdx) => (
              <span
                key={dy}
                onClick={handleOpenMenu}
                onMouseEnter={(event) => (event.target.id = "day")}
                id={
                  props.day === (dayIdx + 1).toString() ? "selected-day" : "day"
                }
                className="font-normal px-2 hover:cursor-default"
              >
                {dy}
              </span>
            ))}
          </div>
        )}
      </div>
      <div
        className="year-container flex flex-col bg-white relative"
        ref={yearRef}
        onClick={() => {
          setOpenYearMenu((prev) => !prev);
        }}
      >
        <span
          className={`border-2 h-14 w-28 text-sm pl-2 py-0.5 rounded-md flex flex-col justify-between hover:cursor-pointer ${
            openYearMenu
              ? "border-blue-500"
              : props.year
              ? "border-blue-500"
              : "border-gray-200"
          }`}
        >
          Year
          <span className="text-base font-bold">{props.year}</span>
          <span className="h-full absolute right-4 top-0 flex items-center">
            <Image
              src="/SVG/icons8-collapse-arrow-50.png"
              alt="drop-down"
              width={16}
              height={16}
              className="rotate-180 w-4 h-4 object-contain"
            />
          </span>
        </span>
        {openYearMenu && (
          <div className="flex flex-col absolute overflow-y-auto overflow-x-hidden max-h-80 w-full bg-white top-full border-2 border-gray-400">
            {rangeList(years[0], years[1], -1).map((yr, yrIdx) => (
              <span
                key={yr}
                onClick={handleOpenMenu}
                onMouseEnter={(event) => (event.target.id = "year")}
                id={
                  props.year === (2023 - yrIdx).toString()
                    ? "selected-year"
                    : "year"
                }
                className="font-normal px-2 hover:cursor-default"
              >
                {yr}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DOBDropdown;
