import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    category: categoryReducer,
  },
});

export default store;
