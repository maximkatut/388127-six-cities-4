import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {ActionCreator} from '../../actions/offers-actions';
import {SortType} from '../../const';
import {extend} from '../../utils';

const withSortMenu = (Component) => {
  class WithSortMenu extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isMenuHide: true,
        sortType: SortType.POPULAR
      };

      this._hideDropdown = this._hideDropdown.bind(this);
      this._handleDropdownClick = this._handleDropdownClick.bind(this);
      this._handleSortClick = this._handleSortClick.bind(this);
    }

    _handleDropdownClick() {
      this.setState((prevState) => {
        return {
          isMenuHide: !prevState.isMenuHide
        };
      });
    }

    _hideDropdown() {
      this.setState({
        isMenuHide: true
      });
    }

    _handleSortClick(_sortType) {
      const {onSortClick} = this.props;
      this._hideDropdown();
      onSortClick(_sortType);
      this.setState({
        sortType: _sortType
      });
    }

    render() {
      const {isMenuHide, sortType} = this.state;
      return (
        <Component
          {...this.props}
          isMenuHide={isMenuHide}
          sortType={sortType}
          handleDropdownClick={this._handleDropdownClick}
          onSortClick={this._handleSortClick}
        />
      );
    }
  }

  WithSortMenu.propTypes = {
    onSortClick: PropTypes.func.isRequired
  };

  return WithSortMenu;
};

const mapDispatchToProps = (dispatch) => ({
  onSortClick(sortType, offersByCity) {
    dispatch(ActionCreator.changeSortType(sortType, offersByCity));
  }
});

const mapStateToProps = (state) => ({
  offers: state.offers.offers
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return extend({
    ownProps,
    stateProps,
    dispatchProps,
    onSortClick(sortType, offersByCity = stateProps.offers) {
      dispatchProps.onSortClick(sortType, offersByCity);
    }
  });
};

const composedWithSortMenu = compose(
    connect(mapStateToProps, mapDispatchToProps, mergeProps),
    withSortMenu
);


export default composedWithSortMenu;