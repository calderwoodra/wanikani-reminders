import React from "react";
import PropTypes from "prop-types";
import { Text, TextStyle } from "../text/Text";
import { classNames } from "../helpers/classNames";
import Link from "next/link";

export default function LinkButton({
  className,
  secondaryButtonStyle,
  outerStyle,
  text,
  href,
  flat,
  external,
  hasHoverColor = true,
}) {
  let buttonStyle = "";
  if (!secondaryButtonStyle) {
    if (flat) {
      buttonStyle = "";
    } else {
      buttonStyle = "text-primary-main-text px-8 py-4 rounded bg-secondary-main";
    }
  } else {
    if (flat) {
      buttonStyle = "text-secondary-main py-4 px-2";
    } else {
      buttonStyle = "";
    }
  }

  const anchorVisible = external ? "block flex-shrink-0" : "hidden";
  const linkVisible = external ? "hidden" : "block";
  return (
    <div className={outerStyle}>
      <a
        className={classNames(
          buttonStyle,
          className,
          "cursor-pointer",
          anchorVisible,
          hasHoverColor ? "hover:text-white" : ""
        )}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text style={TextStyle.button}>{text}</Text>
      </a>
      <Link href={href}>
        <button className={classNames(buttonStyle, className, "cursor-pointer", linkVisible)}>
          <Text style={TextStyle.button}>{text}</Text>
        </button>
      </Link>
    </div>
  );
}

LinkButton.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  outerStyle: PropTypes.string,
};

LinkButton.defaultProps = {
  secondaryButtonStyle: false,
  external: false,
  flat: false,
  className: "",
  text: "",
};
