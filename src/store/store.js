import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './budgetSlice';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    category: categoryReducer,
    budget: budgetReducer,
  },
});

export default store;
