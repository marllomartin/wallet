import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses as deleteACTION } from '../actions';

class Table extends Component {
  render() {
    const { expenses, deleteExpenses } = this.props;

    return (
      <div className="container">
        <table>
          <div className="table-card">
            <tr>
              <th className="table-head value-column"><p>Valor</p></th>
              <th className="table-head description-column"><p>Descrição</p></th>
              <th className="table-head currency-column"><p>Moeda</p></th>
              <th className="table-head exchange-column"><p>Câmbio</p></th>
              <th className="table-head method-column"><p>Método</p></th>
              <th className="table-head tag-column"><p>Tag</p></th>
              <th className="table-head total-column"><p>Total</p></th>
              <th className="table-head delete-column"><p>Excluir</p></th>
            </tr>
          </div>

          {expenses.map((expense) => (
            <div className="table-card">
              <tr key={ expense.id }>
                <td className="table-body value-column">
                  <p>{ Number(expense.value).toFixed(2) }</p>
                </td>

                <hr />

                <td className="table-body description-column">
                  <p>{ expense.description }</p>
                </td>

                <hr />

                <td className="table-body currency-column">
                  <p>{ (expense.exchangeRates[expense.currency].name).replace('/Real Brasileiro', '') }</p>
                </td>

                <hr />

                <td className="table-body exchange-column">
                  <p>
                    { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </p>
                </td>

                <hr />

                <td className="table-body method-column">
                  <p>{ expense.method }</p>
                </td>

                <hr />

                <td className="table-body tag-column">
                  <p>{ expense.tag }</p>
                </td>

                <hr />

                <td className="table-body total-column">
                  <p>
                    R$
                    { (expense.value
                      * expense.exchangeRates[expense.currency].ask).toFixed(2) }
                  </p>
                </td>

                <hr />

                <td className="table-body delete-column">
                <div className="close-div"  onClick={ () => (deleteExpenses(expense)) }>
                <span className="close-btn">&times;</span>
                </div>
                </td>
              </tr>
            </div>
          ))}
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
