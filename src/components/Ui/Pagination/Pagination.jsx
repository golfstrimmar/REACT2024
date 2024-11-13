import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {
  let pagesArray = getPagesArray(totalPages)
  return (
    <div className="pagination">
      <div className="page__wrapper">
        {pagesArray.map((p) => {
          return <span
            onClick={() => changePage(p)}
            key={p}
            className={page == p ? 'page _current' : 'page'}
          >{p}</span>;
        })}
      </div>
    </div>
  );
};
export default Pagination;
  