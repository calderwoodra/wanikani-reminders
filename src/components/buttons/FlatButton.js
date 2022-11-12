import React from "react";
import PropTypes from "prop-types";
import { Text, TextStyle } from "../text/Text";
import { classNames } from "../helpers/classNames";

export default function FlatButton({
  className,
  outerStyle,
  type,
  text,
  children,
  onClick,
  textPosition,
  id = "",
}) {
  const buttonStyle = "min-w-[10rem] px-6 rounded-lg text-secondary-main";
  const padding = textPosition === "bottom" ? "pt-8" : "py-4";
  return (
    <div className={outerStyle}>
      <button
        id={id}
        type={type}
        className={classNames(className, buttonStyle, padding)}
        onClick={onClick}
      >
        {!!text && <Text style={TextStyle.button}>{text}</Text>}
        {!!children && children}
      </button>
    </div>
  );
}

FlatButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  outerStyle: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  textPosition: PropTypes.oneOf(["center", "bottom"]),
};

FlatButton.defaultProps = {
  type: undefined,
  className: "",
  text: "",
  textPosition: "center",
};
