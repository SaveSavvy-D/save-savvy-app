import * as Yup from 'yup';

export const BudgetSchema = Yup.object().shape({
  categoryTitle: Yup.string().required('Category title is required'),
  threshold: Yup.number()
    .required('Threshold is required')
    .positive('Threshold must be greater than zero'),
  month: Yup.date()
    .required('Budget month is required')
    .min(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      'Budget date cannot be in a previous month'
    )
    .max(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      'Budget date cannot be in a future month'
    )
});
export const AuthSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Password required'),
});

export const ExpenseSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be of atleast 3 characters'),
  amount: Yup.number()
    .min(0, 'Amount must be greater than 0')
    .required('Required'),
  date: Yup.date().required('Required'),
  categoryTitle: Yup.string().required('Select atleast one category'),
});
export const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name required'),
  currency: Yup.string()
    .length(3, 'Currency code must be three letters long')
    .matches(/^[A-Z]{3}$/, 'Currency code must be uppercase letters'),
});

export const AlertSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be of atleast 5 characters'),
  thresholdPercentage: Yup.string().required('Threshold percentage required'),
});
