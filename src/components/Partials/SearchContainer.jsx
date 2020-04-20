import React from 'react';

function SearchContainer({ results, display }) {
  let res;

  if (results && results !== undefined && results !== null && Array.isArray(results) && results.length > 0) {
    res = results.map(r => {
      return (
          <div className="list p-0 m-1" key={ r.Kid }>
              <a href={ `/c/classroom/${ r.Kid }` } className="text-dark">
                  {' '}
                  <b> - {r.name} ({r.location})</b>
              </a>
          </div>
      )
    });
  }
  return (
      <div className={ `card ${ display ? 'd-block' : 'd-none' }` }>
          <div className="card-body">{res}</div>
      </div>
  );
}

export default SearchContainer;
