import React from 'react';
import { Link } from 'react-router-dom'
function SearchContainer({ results, display }) {
  let res;

  if (results && results !== undefined && results !== null && Array.isArray(results) && results.length > 0) {
    res = results.map(r => {
      return (
          <div className="list p-0 text-align-left" key={ r.kid }>
          { r.name.toLowerCase() === 'no results found!!' ? (<b>Whoops! No result found</b>) : 
              (<div><Link to={ `/c/classroom/${ r.kid }` } className="text-dark">
                {r.topic}
              </Link>
            <p><small>by: {r.name.toLowerCase() || r.communityName.toLowerCase()}</small></p></div>)
            }
          </div>
      )
    });
  }
  return (
      <div className={ `card ${ display ? 'd-block' : 'd-none' } h-50` }>
      <div className="card-body border-r h-100 overflow-scroll">{res}</div>
      </div>
  );
}

export default SearchContainer;
