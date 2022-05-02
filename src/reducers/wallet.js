import { SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  total: 0,
};

function deleteExpense(state, action) {
  const newArray = state.expenses.filter(
    (expense) => expense.id !== action.expense.id,
  );
  const newTotal = Number(
    Number(action.expense.value)
    * Number(action.expense.exchangeRates[action.expense.currency].ask),
  );

  return {
    ...state,
    expenses: newArray,
    total: Number(state.total - newTotal).toFixed(2),
  };
}

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      total: (parseFloat(state.total)
      + ((parseFloat(action.expense.value))
      * (parseFloat(action.expense.exchangeRates[action.expense.currency].ask))))
        .toFixed(2),
    };

  case DELETE_EXPENSE:
    return deleteExpense(state, action);

  default:
    return state;
  }
};

export default wallet;
