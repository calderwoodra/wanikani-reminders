import React from "react";
import { classNames } from "./helpers/classNames";

export const Card = ({
  children,
  className,
  topDivider = false,
  bottomDivider = false,
  bottomPadding = true,
  topPadding = true,
  startPadding = true,
  endPadding = true,
}) => {
  const padding = classNames(
    bottomPadding ? "pb-5 md:pb-8" : "",
    topPadding ? "pt-5 md:pt-8" : "",
    startPadding ? "pl-5 md:pl-8" : "",
    endPadding ? "pr-5 md:pr-8" : ""
  );

  return (
    <>
      {topDivider && (
        <div
          className={"w-full h-[1px] bg-disabled-gray my-6 block md:hidden"}
        />
      )}
      <div
        className={classNames(
          className,
          padding,
          "w-full bg-white rounded-xl mb-4 md:border-[1px] border-black border-opacity-10 md:shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] overflow-hidden"
        )}
      >
        {children}
      </div>
      {bottomDivider && (
        <div
          className={"w-full h-[1px] bg-disabled-gray my-6 block md:hidden"}
        />
      )}
    </>
  );
};
