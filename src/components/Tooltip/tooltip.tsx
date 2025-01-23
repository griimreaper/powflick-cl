import useFlag from "hooks/useFlag";
import React, { FC, useState } from "react";

interface CustomTooltipProps {
  content?: string[];
  children: any;
  position?: "top" | "bottom" | "left" | "right";
}

const CustomTooltip: FC<CustomTooltipProps> = ({
  content,
  children,
  position,
}) => {
  const [hover, setHover] = useFlag();

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full mb-2 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "top-full mt-2 left-1/2 transform -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 transform -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 transform -translate-y-1/2";
      default:
        return "right-full mr-2 top-1/2 transform -translate-y-1/2";
    }
  };

  const getArrowPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-t-transparent border-l-transparent";
      case "bottom":
        return "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-b-transparent border-r-transparent";
      case "left":
        return "right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 border-l-transparent border-b-transparent";
      case "right":
        return "left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 border-r-transparent border-t-transparent";
      default:
        return "right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 border-l-transparent border-b-transparent";
    }
  };

  return (
    <div className="relative flex rounded-md">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </div>
      {hover && (
        <div
          className={`rounded-md absolute h-auto max-w-sm z-10 bg-white border-gray-400 border-2 text-sm   opacity-100 px-2 py-1 transition-opacity duration-300 ${getPositionClasses()}`}
        >
          {content?.map((word, index) => (
            <h2 key={index} className="font-medium text-black">
              {word}
            </h2>
          ))}
          <div
            className={`absolute w-4 z-0 h-4 bg-white border-gray-400 border-2 transform rotate-45 ${getArrowPositionClasses()}`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
