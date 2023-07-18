import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import expenseReducer from './expenseSlice';
import categoryReducer from './categorySlice';
import budgetReducer from './budgetSlice';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    alert: alertReducer,
    budget: budgetReducer,
    category: categoryReducer,
    expense: expenseReducer,
    user: userReducer,
    profile: profileReducer,
    notification: notificationReducer,
  },
});

export default store;
