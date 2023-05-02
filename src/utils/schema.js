import * as Yup from 'yup';

export const ExpenseSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  amount: Yup.number().min(1, 'Too Short!').required('Required'),
  date: Yup.date().required('Required'),
  description: Yup.string().required('Message is required'),
  categoryId: Yup.string().required('Select atleast one category'),
});
