import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoTvOutline, IoTv } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMasksTheater } from "@fortawesome/free-solid-svg-icons"; // Example icon

interface GenresCardProp {
  title: string;
  isPartialSlide: boolean;
  activeIndex: number;
  onSelect: () => void;
  isSelected: boolean;
  iconBlack: any;
  iconWhite: any;
}
function GenresCard({
  title,
  isPartialSlide,
  activeIndex,
  onSelect,
  isSelected,
  iconBlack,
  iconWhite,
}: GenresCardProp) {
  //const [isSelected, setIsSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <Button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect()}
        className={`bg-customServicesColor pt-[10rem] rounded-full w-[12rem] h-[12rem] text-2xl font-bold hover:bg-white/90 hover:text-black 
              hover:font-bold transition-transform duration-300 ease-in-out active:scale-95 ${
                isPartialSlide ? "opacity-50 pointer-events-none" : ""
              } ${isSelected ? "bg-white/90" : ""}`}
      >
        {/* Center the icon within the button */}
        <div className="flex justify-center items-center absolute mb-[10rem]">
          {hovered || isSelected ? (
            <img
              src={iconBlack}
              style={{
                width: "6rem",
                height: "6rem",
              }}
            />
          ) : (
            <img
              src={iconWhite}
              style={{
                width: "6rem",
                height: "6rem",
              }}
            />
          )}
        </div>
        <h1 className="mt-[7rem] pointer-events-none text-white transform-none">
          {title}
        </h1>
      </Button>
    </div>
  );
}

export default GenresCard;
