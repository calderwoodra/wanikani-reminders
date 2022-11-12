import React from "react";
import { classNames } from "../helpers/classNames";
import { Text, TextStyle } from "../text/Text";

export const Checkbox = ({ id, value, label, onChange, outerClassName, className }) => {
  const border = "border-[1px] focus:border-primary-light focus:shadow-outline";
  const shape = "w-5 h-5 rounded-sm mr-4";
  return (
    <div className={outerClassName}>
      <label className={"flex flex-row items-center"}>
        <input
          id={id}
          value={value}
          onChange={() => onChange(!value)}
          className={classNames(className, border, shape, "bg-white")}
          type={"checkbox"}
        />
        <span>
          <Text className={TextStyle.sub_value}>{label}</Text>
        </span>
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  value: false,
};
