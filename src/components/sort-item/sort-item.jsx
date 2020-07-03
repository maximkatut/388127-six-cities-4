import React from 'react';
import PropTypes from 'prop-types';

const SortItem = (props) => {
  const {onSortClick, sortType} = props;
  return (
    <li
      className="places__option"
      tabIndex={0}
      onClick={() => {
        onSortClick(sortType);
      }}
    >
      {sortType}
    </li>
  );
};

SortItem.propTypes = {
  onSortClick: PropTypes.func.isRequired,
  sortType: PropTypes.string
};

export default SortItem;
