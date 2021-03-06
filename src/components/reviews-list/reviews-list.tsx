import React from 'react';

import {reviewTypes} from '../../types';
import {MAX_COUNT_REVIEWS} from '../../const';

import Review from '../review/review';

interface Props {
  reviews?: reviewTypes[];
}

const ReviewsList: React.FC<Props> = ({reviews}: Props) => {

  return (
    <ul className="reviews__list">
      {reviews.map((review) => {
        return <Review
          key={review.id}
          review={review}
        />;
      }).reverse().slice(0, MAX_COUNT_REVIEWS)}
    </ul>
  );
};

export default ReviewsList;
