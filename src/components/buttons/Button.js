import React from "react";
import PropTypes from "prop-types";
import { Text, TextStyle } from "/src/components/text/Text";
import { classNames } from "/src/components/helpers/classNames";
import { TailSpin } from "react-loader-spinner";

export default function Button({
  id = "",
  className,
  secondaryButtonStyle,
  outerStyle,
  disabled,
  type,
  text,
  children,
  onClick,
  loading,
}) {
  const structureStyle = "min-w-[10rem] px-6 py-4 rounded-lg";
  let buttonStyle = "text-secondary-main border-secondary-main border-[2px]";
  if (disabled) {
    buttonStyle = "text-secondary-text bg-disabled-gray";
  } else if (!secondaryButtonStyle) {
    buttonStyle = "text-primary-main-text px-6 py-4 rounded-lg bg-secondary-main min-w-[10rem]";
  }

  return (
    <div className={outerStyle}>
      <button
        id={id}
        disabled={disabled || loading}
        type={type}
        className={classNames(className, buttonStyle, structureStyle)}
        onClick={onClick}
      >
        {loading && (
          <div className={"py-1"}>
            <TailSpin radius={"2"} wrapperClass={"justify-center"} height={"20"} width={"20"} color={"#FFFFFF"} />
          </div>
        )}
        {!loading && !!text && <Text style={TextStyle.button}>{text}</Text>}
        {!loading && !!children && children}
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  outerStyle: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
};

Button.defaultProps = {
  type: undefined,
  secondaryButtonStyle: false,
  disabled: false,
  className: "",
  text: "",
  loading: false,
};
