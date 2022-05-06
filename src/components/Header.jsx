import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wallet from '../wallet-animate.svg';

class Header extends Component { 
  render() { 
    const {  email, total  } = this.props;

    return (
      <div className='wallet-header'>
        <header>
          <div className="wallet-image">
            <img src={ wallet } alt="Dinheiro" />
          </div>

          <h2>Wallet</h2>

          <hr />

          <p className="wallet-email">{ email }</p>

          <p className="wallet-total">Total: </p>
          {!total || total === "-0.00" ? (
            <span>R$ 0.00</span>
          ) : (
            <span>R$ { total }</span>
          )}

          <hr />
        </header>
      </div>
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
