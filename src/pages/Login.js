import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';
import '../styles/Login/styles.css';
import login from '../login-animate.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };

    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  }

  validateLogin(email, password) {
    const passLength = 6;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValidation.test(email) && password.length >= passLength) {
      return false;
    }
    return true;
  }

  submitLogin(event) {
    const { email } = this.state;
    const { history, userLogin } = this.props;

    event.preventDefault();
    userLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-page">
        <div className="login-image">
          <img src={ login } alt="Carteira" />
        </div>

        <div className="login-card">

          <h1>Wallet</h1>

          <h3>Login</h3>

          <div className="login-field">
            <input
              name="email"
              value={ email }
              type="email"
              data-testid="email-input"
              id="email"
              placeholder="Email"
              autoComplete="off"
              onChange={ this.handleChange }
            />
          </div>

          <div className="login-field">
            <input
              name="password"
              value={ password }
              type="password"
              data-testid="password-input"
              id="password"
              placeholder="Senha"
              onChange={ this.handleChange }
            />
          </div>

          <button
            className="login-btn"
            type="submit"
            data-testid="login-button"
            name="login-button"
            disabled={ this.validateLogin(email, password) }
            onClick={ this.submitLogin }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (email) => dispatch(saveEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
