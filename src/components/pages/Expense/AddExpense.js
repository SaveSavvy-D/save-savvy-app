import { Formik } from 'formik';
import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  createExpense,
  deleteExpense,
  updateExpense,
} from '../../../store/expenseSlice';
import { fetchCategories } from '../../../store/categorySlice';
import { ExpenseSchema } from '../../../utils/yup/schemas';

export const AddExpense = ({ showModal, handleClose, expense, create }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const initialValues = {
    title: expense?.title || '',
    amount: expense?.amount || '',
    description: expense?.description || '',
    date: expense?.date?.substring(0, 10) || '',
    categoryTitle: expense?.category?.title || '',
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formatValues = (values) => {
    const categoryId = categories?.filter(
      (category) => category.title === values.categoryTitle
    );

    return { ...values, categoryId: categoryId[0]._id };
  };

  const handleSubmitExpense = (values) => {
    dispatch(createExpense(formatValues(values)));
  };

  const handleUpdateExpense = (values) => {
    const payload = formatValues(values);
    dispatch(
      updateExpense({
        id: expense?._id,
        updatedBody: payload,
      })
    );
  };

  const handleDeleteExpense = () => {
    dispatch(deleteExpense({ id: expense?._id }));
    window.location.reload();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={ExpenseSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (create) {
            handleSubmitExpense(values);
          } else {
            handleUpdateExpense(values);
          }
          setSubmitting(false);
          handleClose();
          window.location.reload();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className='margin-bottom-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={touched.title && errors.title}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='margin-bottom-3' controlId='amount'>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type='number'
                  name='amount'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  isInvalid={touched.amount && errors.amount}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='margin-bottom-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={touched.description && errors.description}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='margin-bottom-3' controlId='date'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type='date'
                  name='date'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  isInvalid={touched.date && errors.date}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='margin-bottom-3' controlId='categoryTitle'>
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  as='select'
                  name='categoryTitle'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryTitle}
                  isInvalid={touched.categoryTitle && errors.categoryTitle}
                >
                  <option value={values.categoryTitle || ''}>
                    {values.categoryTitle || 'Select a category title'}
                  </option>
                  {categories
                    ?.filter(
                      (category) => category.title !== values.categoryTitle
                    )
                    .map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  {errors.categoryTitle}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={!dirty || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              {!create ? (
                <Button
                  variant='danger'
                  disabled={isSubmitting}
                  onClick={handleDeleteExpense}
                  type='submit'
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </Button>
              ) : (
                ''
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
