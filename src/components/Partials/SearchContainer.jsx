import React from 'react';

function SearchContainer({ results, display }) {
  let res;

  if (results && results !== undefined && results !== null) {
    res = results.map(r => {
      return (
          <div className="list p-0" key={ r._id }>
              <a href={ `/c/classroom/${ r._id }` } className="text-dark">
                  {' '}
                  {r.name} ({r.location})
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
