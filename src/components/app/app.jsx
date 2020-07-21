import {bool, shape, string} from 'prop-types';
import React from 'react';
import Notifications, {notify} from 'react-notify-toast';
import {connect} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

import {getErrorStatus} from '../../reducers/data/selectors';
import history from '../../history';

import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import FavoritesList from '../favorites-list/favorites-list.jsx';
import PrivateRoute from '../private-route/private-route.jsx';

class App extends React.PureComponent {
  render() {
    const {isError} = this.props;
    return (
      <Router history={history}>
        <Notifications />
        {isError.status && notify.show(`${isError.message}`, `error`)}
        <Switch>
          <PrivateRoute
            exact
            path="/favorites"
            render={(props) => {
              return <FavoritesList {...props} />;
            }}
          />
          <Route exact path="/offer/:id?" component={Offer} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/:city?" component={Main} />
          <Redirect path="" to="/" />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  isError: shape({
    status: bool.isRequired,
    message: string.isRequired
  }).isRequired
};

const mapStateToProps = (state) => ({
  isError: getErrorStatus(state)
});

export default connect(mapStateToProps, null)(App);
