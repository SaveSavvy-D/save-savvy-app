import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './budgetSlice';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    category: categoryReducer,
    budget: budgetReducer,
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
