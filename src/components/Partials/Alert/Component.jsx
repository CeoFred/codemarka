import React from "react";

const Component = props => {
  return (
    <div
      className={`alert alert-${props.type} alert-dismissible fade show d-${props.display ? 'block' : 'none'}`}
      role="alert"
    >
      {props.message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Component;
