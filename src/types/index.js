import {OfferTypes} from '../const.js';
import PropTypes from 'prop-types';

const {shape, string, number, bool, arrayOf, oneOf} = PropTypes;

export const offerPropType = shape({
  coordinates: arrayOf(number).isRequired,
  title: string.isRequired,
  offerType: oneOf(OfferTypes).isRequired,
  mainImage: string.isRequired,
  premium: bool.isRequired,
  price: number.isRequired,
  rate: number.isRequired
}).isRequired;

export const offerFullPropType = shape({
  appliences: arrayOf(string).isRequired,
  bedrooms: number.isRequired,
  city: shape({
    name: string.isRequired,
    coords: arrayOf(number).isRequired
  }).isRequired,
  coordinates: arrayOf(number).isRequired,
  description: arrayOf(string).isRequired,
  guests: number.isRequired,
  host: shape({
    avatar: string.isRequired,
    name: string.isRequired,
    super: bool.isRequired
  }).isRequired,
  imagesGallery: arrayOf(string).isRequired,
  mainImage: string.isRequired,
  offerType: oneOf(OfferTypes).isRequired,
  premium: bool.isRequired,
  price: number.isRequired,
  rate: number.isRequired,
  reviews: arrayOf(shape({
    id: string.isRequired,
    user: shape({
      userName: string.isRequired,
      avatar: string.isRequired
    }).isRequired,
    content: string.isRequired,
    rate: number.isRequired,
    date: string.isRequired
  }).isRequired).isRequired,
  title: string.isRequired
});

export const reviewPropTypes = shape({
  id: string.isRequired,
  user: shape({
    userName: string.isRequired,
    avatar: string.isRequired
  }).isRequired,
  content: string.isRequired,
  rate: number.isRequired,
  date: string.isRequired
}).isRequired;
