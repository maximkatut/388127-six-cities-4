import React from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducers/user/user-reducer';

import Header from '../header/header.jsx';

class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this._inputEmail = React.createRef();
    this._inputPassword = React.createRef();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(evt) {
    const {loginUser} = this.props;
    evt.preventDefault();
    loginUser({login: this._inputEmail.current.value, password: this._inputPassword.current.value});
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header />
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={this.handleFormSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input ref={this._inputEmail} className="login__input form__input" type="email" autoComplete="username" name="email" placeholder="Email" required />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input ref={this._inputPassword} className="login__input form__input" type="password" autoComplete="current-password" name="password" placeholder="Password" required />
                </div>
                <button className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  loginUser: func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  loginUser(authData) {
    dispatch(Operation.login(authData));
  }
});

export default connect(null, mapDispatchToProps)(SignIn);
