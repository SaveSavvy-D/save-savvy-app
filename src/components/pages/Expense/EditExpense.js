import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ExpenseSchema } from '../../../utils/schema';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/categorySlice';
import { Button } from 'react-bootstrap';
import { updateExpense } from '../../../store/expenseSlice';

export const EditExpense = ({
  showEditModal,
  handleCloseEdit,
  singleExpense,
}) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  let initialValues = {};
  if (showEditModal) {
    initialValues = {
      title: singleExpense?.title,
      amount: singleExpense?.amount,
      description: singleExpense?.description,
      date: new Date(singleExpense?.date).toISOString().substring(0, 10),
      categoryId: singleExpense?.category?._id,
    };
  }

  const handleUpdate = (values) => {
    const updatedExpense = { ...values, id: singleExpense._id };
    dispatch(updateExpense(updatedExpense));
    handleCloseEdit();
  };

  return (
    <Modal show={showEditModal} onHide={handleCloseEdit}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={ExpenseSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleUpdate(values);
            setSubmitting(false);
            window.location.reload();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            dirty,
            setFieldValue,
            isSubmitting,
          }) => {
            return (
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
                    <Field
                      name='date'
                      type='date'
                      onChange={(e) => {
                        const selectedDate = new Date(e.target.value);
                        const formattedDate = selectedDate
                          .toISOString()
                          .substring(0, 10);
                        setFieldValue('date', formattedDate);
                      }}
                    />
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
                      const selectedCategory =
                        categories?.data?.categories.find(
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

                <button type='submit' disabled={!dirty || isSubmitting}>
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseEdit}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
