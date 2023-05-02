import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import { createExpense } from '../../../store/expenseSlice';
import { ExpenseSchema } from '../../../utils/schema';
import { fetchCategories } from '../../../store/categorySlice';
import { showNotification } from '../../../utils/notificationHelper';

export const AddExpense = ({ showModal, handleClose }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleSubmit = (values) => {
    dispatch(createExpense(values));
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            title: '',
            amount: '',
            description: '',
            date: '',
            categoryId: '',
          }}
          validationSchema={ExpenseSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleSubmit(values);
            setSubmitting(false);
            window.location.reload();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <div>
                <label htmlFor='title'>Title</label>
                <div>
                  <Field type='text' name='title' />
                  <ErrorMessage name='title' component='div' />
                </div>
              </div>
              <div>
                <label htmlFor='amount'>Amount</label>
                <div>
                  <Field name='amount' type='text' />
                  <ErrorMessage name='amount' component='div' />
                </div>
              </div>
              <div>
                <label htmlFor='description'>description</label>
                <div>
                  <Field name='description' type='text' />
                  <ErrorMessage name='description' component='div' />
                </div>
              </div>
              <div>
                <label htmlFor='date'>Date</label>
                <div>
                  <Field name='date' type='date' />
                  <ErrorMessage name='date' component='div' />
                </div>
              </div>
              <div>
                <label htmlFor='category'>Category</label>
                <Field
                  as='select'
                  name='categoryId'
                  value={values.categoryId}
                  onChange={(e) => {
                    const selectedCategory = categories?.data?.categories.find(
                      (category) => category._id === e.target.value
                    );
                    setFieldValue('categoryId', selectedCategory._id);
                  }}
                >
                  <option value=''>Select a category</option>
                  {categories?.data?.categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name='categoryId' component='div' />
              </div>

              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
