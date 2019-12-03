import React from "react";

import { Link } from "react-router-dom";

function SearchContainer({ results, display }) {
  let res;
  console.log(results);

  if (results && results !== undefined && results !== null) {
    res = results.map(r => {
      return (
        <div className="list" key={r._id}>
          <Link to={`/c/classroom/${r._id}`} className="text-black-50">
            {" "}
      {r.name}  <span className="float-right"><i className="fa fa-map-marker "></i>{" "} - {" "}{r.location}</span>
          </Link>
        </div>
      );
    });
  }
  return (
    <div className={`card ${display ? "d-block" : "d-none"}`}>
      <div className="card-body">{res}</div>
    </div>
  );
}

export default SearchContainer;
