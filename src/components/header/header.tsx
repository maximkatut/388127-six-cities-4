import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getUser, getUserStatus} from '../../reducers/user/selectors';
import {AuthorizationStatus} from '../../reducers/user/user-reducer';
import {AppRoute} from '../../const';

interface Props {
  userStatus: string;
  user: {
    email?: string;
    avatar?: string;
  };
}

const Header: React.FC<Props> = ({user, userStatus}: Props) => {
  const isUserLogged = (userStatus === AuthorizationStatus.AUTH) ? true : false;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={AppRoute.ROOT}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                  <div
                    style={{backgroundImage: user.avatar && `url(https://htmlacademy-react-3.appspot.com/six-cities${user.avatar})`}}
                    className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">{isUserLogged ? `${user.email}` : `Sign in`}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: getUser(state) || ``,
  userStatus: getUserStatus(state)
});

export default connect(mapStateToProps, null)(Header);
