export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export const deleteExpenses = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
