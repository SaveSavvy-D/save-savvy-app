import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './budgetSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    category: categoryReducer,
    budget: budgetReducer,
    user: userReducer,
  },
});

export default store;
