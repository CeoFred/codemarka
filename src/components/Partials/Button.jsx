import React from "react";

export default function Button(props) {
  return (
    <button
      onClick={props.clicked}
      type="button"
      className={`btn btn-${props.color} ${props.animation} btn-${
        props.size
      } ${props.icon || ""}`}
      disabled={props.disabled || false}
      style={{ color: `${props.textColor || "inherit"}` }}
    >
      {props.children}
    </button>
  );
}
