import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import '../styles/Wallet/styles.css';

class Wallet extends React.Component {
  render() {
    return (

      <div className="wallet-page">
        <div className="wallet-card">
          <Header />
          <Form />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
