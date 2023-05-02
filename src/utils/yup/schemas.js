import * as Yup from 'yup';

export const BudgetSchema = Yup.object().shape({
  categoryTitle: Yup.string().required('Category title is required'),
  threshold: Yup.number()
    .required('Threshold is required')
    .positive('Threshold must be greater than zero'),
  startDate: Yup.date()
    .required('Start date is required')
    .min(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1),
      'Start date cannot be in the previous month'
    ),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date cannot be less than start date')
    .test(
      'is-valid-date',
      'End date must be at least one day later than start date',
      function (endDate) {
        const startDate = this.resolve(Yup.ref('startDate'));
        return endDate && startDate
          ? endDate.getTime() >= startDate.getTime() + 86400000
          : true;
      }
    )
    .max(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      'End date cannot be in the next month'
    ),
});
