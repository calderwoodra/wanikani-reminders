import React from "react";
import { classNames } from "../helpers/classNames";

export const Divider = ({ className, margin = true }) => {
  return (
    <div
      className={classNames(
        "w-full h-[2px] bg-disabled-gray",
        className,
        margin ? "my-4" : ""
      )}
    />
  );
};

export const VerticalDivider = ({ className, margin = true }) => {
  return (
    <div
      className={classNames(
        "w-[2px] h-100 bg-disabled-gray",
        className,
        margin ? "my-4" : ""
      )}
    />
  );
};
