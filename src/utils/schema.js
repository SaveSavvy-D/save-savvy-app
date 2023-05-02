import * as Yup from 'yup';

export const ExpenseSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be of atleast 5 characters'),
  amount: Yup.number().min(0, 'Too Short!').required('Required'),
  date: Yup.date().required('Required'),
  categoryId: Yup.string().required('Select atleast one category'),
});
