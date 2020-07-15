import {func} from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Operation} from '../../reducers/data/data-reducer';
import {getStatusRequest} from '../../reducers/data/selectors';

const MESSAGE_LENGTH = 49;

const withReview = (Component) => {
  class WithReview extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        review: ``,
        rating: 0,
        isDisabled: true
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRadioChange = this._handleRadioChange.bind(this);
      this._handleInputChange = this._handleInputChange.bind(this);
    }

    _handleFormSubmit(evt) {
      const {postNewReview} = this.props;
      const {review, rating} = this.state;
      evt.preventDefault();
      postNewReview({comment: review, rating});
      this.setState({
        review: ``,
        rating: 0
      });
    }

    _handleRadioChange(evt) {
      this.setState({
        rating: Number(evt.target.value)
      });
    }

    _handleInputChange(evt) {
      this.setState({
        review: evt.target.value
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.review !== this.state.review || prevState.rating !== this.state.rating) {
        this.setState((state) => ({
          isDisabled: (state.review.length > MESSAGE_LENGTH && state.rating > 0) ? false : true
        }));
      }
    }

    render() {
      const {isDisabled, review, rating} = this.state;
      return (
        <Component
          {...this.props}
          isDisabled={isDisabled}
          review={review}
          rating={rating}
          onFormSubmit={this._handleFormSubmit}
          onRadioChange={this._handleRadioChange}
          onInputChange={this._handleInputChange}
        />
      );
    }
  }

  WithReview.propTypes = {
    postNewReview: func.isRequired
  };

  return WithReview;
};

const mapDispatchToProps = (dispatch) => ({
  postNewReview(review) {
    dispatch(Operation.postReview(review));
  }
});

const mapStateToProps = (state) => ({
  isBusy: getStatusRequest(state)
});

const composedWithReview = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReview
);


export default composedWithReview;
