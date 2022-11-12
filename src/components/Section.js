import React from "react";
import { classNames } from "./helpers/classNames";

export const Section = ({ children, outerClassName, innerClassName, ...props }) => {
  return (
    <div className={classNames(outerClassName, "w-full")} {...props}>
      <div className={classNames(innerClassName, "w-full max-w-[1250px] mx-auto flex flex-col")}>{children}</div>
    </div>
  );
};

Section.defaultProps = {
  outerClassName: "",
  innerClassName: "",
};
