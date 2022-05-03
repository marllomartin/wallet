import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses as deleteACTION } from '../actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpenses } = this.props;
    return (
      <div className="wallet-table">
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Tag</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Excluir</th>
            </tr>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.value}</td>

                <td>{expense.description}</td>

                <td>{expense.exchangeRates[expense.currency].name}</td>

                <td>{expense.method}</td>

                <td>{expense.tag}</td>

                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>

                <td>
                  {(expense.value
                    * expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => deleteExpenses(expense) }
                >
                  Excluir
                </button>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (expense) => dispatch(deleteACTION(expense)),
});

Table.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
