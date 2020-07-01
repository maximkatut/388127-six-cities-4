import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerFullPropType} from '../../types';
import {MAP_ZOOM, MAP_ICON_SIZE, MAP_ICON_URL, MAP_ACTIVE_ICON_URL} from '../../const.js';
import {findClosestOffers} from '../../utils';
import {connect} from 'react-redux';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this._divRef = React.createRef();
    this._activeCity = this._getActiveCity();
  }

  _getActiveCity() {
    const {cities, activeCityName} = this.props;
    return cities.filter((city) => city.name === activeCityName)[0];
  }

  componentDidUpdate(prevProps) {
    const {offers} = this.props;

    if (prevProps.activeCityName !== this.props.activeCityName) {
      this._activeCity = this._getActiveCity();
      this._markers.forEach((marker) => this._map.removeLayer(marker));
      this._map.flyTo(this._activeCity.coords);
      this._renderMapMarkers(offers, this._icon, this._map);
    }

    if (prevProps.activeOffer !== this.props.activeOffer) {
      this._renderMapMarkersOnOffer(this.props.activeOffer, offers, this._icon, this._map);
    }
  }

  componentDidMount() {
    const {offers, activeOffer} = this.props;

    const mapContainer = this._divRef.current;
    const cityCoords = this._activeCity.coords;

    const zoom = MAP_ZOOM;
    const icon = this._icon = leaflet.icon({
      iconUrl: MAP_ICON_URL,
      iconSize: MAP_ICON_SIZE
    });
    this._activeIcon = leaflet.icon({
      iconUrl: MAP_ACTIVE_ICON_URL,
      iconSize: MAP_ICON_SIZE
    });

    const map = this._map = leaflet.map(mapContainer, {
      center: cityCoords,
      zoom,
      scrollWheelZoom: false,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        })]
    });

    map.once(`focus`, () => {
      map.scrollWheelZoom.enable();
    });

    if (activeOffer) {
      this._renderMapMarkersOnOffer(activeOffer, offers, this._icon, this._map);
    } else {
      this._renderMapMarkers(offers, icon, map);
    }
  }

  _renderMapMarkersOnOffer(activeOffer, offers, icon, map) {
    const closestOffers = findClosestOffers(activeOffer, offers);
    leaflet.marker(activeOffer.coordinates, {icon: this._activeIcon}).addTo(map);
    this._renderMapMarkers(closestOffers, icon, map);
  }

  _renderMapMarkers(offers, icon, map) {
    const markers = [];
    offers.forEach((offer) => {
      const marker = leaflet.marker(offer.coordinates, {icon}).addTo(map);
      markers.push(marker);
    });
    this._markers = markers;
  }

  componentWillUnmount() {
    const mapContainer = this._divRef.current;
    mapContainer.remove();
  }

  render() {
    return (
      <div
        ref={this._divRef}
        style={{height: `100%`}}
      >
      </div>
    );
  }
}

Map.propTypes = {
  activeOffer: offerFullPropType,
  offers: PropTypes.arrayOf(offerFullPropType.isRequired).isRequired,
  cities: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  activeCityName: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  activeCityName: state.activeCityName,
  offers: state.offers
});

export default connect(mapStateToProps, null)(Map);
