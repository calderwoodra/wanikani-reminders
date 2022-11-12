import React from "react";
import { classNames } from "../helpers/classNames";
import { Text, TextStyle } from "../text/Text";
import PropTypes from "prop-types";

export const Input = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  className,
  type,
  error,
  outerClassName = "",
  ...props
}) => {
  const border =
    "border-secondary-text border-[1px] focus:border-secondary-main focus:shadow-outline";
  const errorBorder = !!error ? "!border-red-600" : "";
  const shape = "w-full px-3 py-2 rounded-lg";

  const updatedType = type === "number" ? "text" : type;
  const onChangeHandler = (e) => {
    if (type === "number") {
      const value = e.target.value;
      onChange(value.replace(/[^0-9.]/g, ""));
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <label
      className={classNames(outerClassName, "flex flex-col w-full md:w-72")}
    >
      {!!label && <Text style={TextStyle.title}>{label}</Text>}
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        onWheel={(e) => {
          if (type === "number") {
            e.target.blur();
          }
        }}
        onChange={onChangeHandler}
        className={classNames(
          className,
          border,
          shape,
          errorBorder,
          "bg-white"
        )}
        type={updatedType}
        {...props}
      />
      {!!error && (
        <Text
          style={TextStyle.fine_print}
          className={"text-red-600 font-semibold mt-[1px]"}
        >
          {"" + error}
        </Text>
      )}
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(["text", "password", "date", "number", "email", "tel"]),
};

Input.defaultProps = {
  type: "text",
  error: "",
};
