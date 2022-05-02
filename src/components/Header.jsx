import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <header>
        <h2>Wallet</h2>
        <span data-testid="email-field">{ email }</span>
        {total ? (
          <span data-testid="total-field">{ total }</span>
        ) : (
          <span data-testid="total-field">0</span>
        )}
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
