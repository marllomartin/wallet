import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveExpenses } from '../actions';
import fetchCurrencies from '../services/fetchCurrencies';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.requestExchangeRates = this.requestExchangeRates.bind(this);
  }

  async componentDidMount() {
    this.requestExchangeRates();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submitExpense(event) {
    event.preventDefault();
    const { id } = this.state;
    const { dispatchExpense } = this.props;
    dispatchExpense(this.state);
    this.requestExchangeRates();
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  }

  async requestExchangeRates() {
    const data = await fetchCurrencies();
    delete data.USDT;
    this.setState({ exchangeRates: data });
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;

    const currencies = Object.keys(exchangeRates);

    return (
        <form className="wallet-form" onSubmit={ this.submitExpense }>
          <p>Despesa:</p>
          <input
            name="value"
            id="value"
            type="number"
            min="1"
            value={ value }
            onChange={ this.handleChange }
            placeholder={ `Valor em ${ this.state.currency }` }
            step=".01"
            autoComplete="off"
            required
          />

          <p>Descrição:</p>
          <input
            name="description"
            id="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
            autoComplete="off"
            spellCheck="off"
            maxLength="15"
            placeholder="Breve descrição"
            required
          />

          <p>Moeda:</p>
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            required
          >
            {currencies.map((name, index) => (
              <option value={ name } key={ index }>
                { name }
              </option>
            ))}
          </select>

          <p>Método de Pagamento:</p>
          <select
            name="method"
            id="payment-method"
            value={ method }
            onChange={ this.handleChange }
            required
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <p>Categoria:</p>
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            required
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button className="wallet-form-btn" type="submit">
            Adicionar despesa
          </button>
        </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchExpense: (state) => dispatch(saveExpenses(state)),
});

Form.propTypes = {
  dispatchExpense: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);
