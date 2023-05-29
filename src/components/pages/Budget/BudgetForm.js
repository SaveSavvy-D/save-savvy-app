import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';

import { BudgetSchema } from '../../../utils/yup/schemas';
import {
  updateBudget,
  createBudget,
  deleteBudget,
  fetchBudgets,
} from '../../../store/budgetSlice';

export const BudgetForm = ({
  budget,
  handleCloseModal,
  create,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.category);

  const resetTable = () => {
    setCurrentPage(1);
    dispatch(fetchBudgets());
  };

  const createPayload = (values) => {
    const categoryId = data?.categories?.filter(
      (category) => category.title === values.categoryTitle
    );

    return { ...values, categoryId: categoryId[0]._id };
  };

  const handleCreateBudget = async (values) => {
    const payload = createPayload(values);
    await dispatch(
      createBudget({
        newData: payload,
      })
    );
    resetTable();
  };

  const handleUpdateBudget = async (values) => {
    const payload = createPayload(values);
    await dispatch(
      updateBudget({
        id: budget?._id,
        newData: payload,
      })
    );
    resetTable();
  };

  const handleDeleteBudget = async () => {
    await dispatch(deleteBudget({ id: budget?._id }));
    resetTable();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          categoryTitle: budget?.categoryId?.title || '',
          threshold: budget?.threshold || '',
          month: budget?.month?.substring(0, 10) || ''
        }}
        validationSchema={BudgetSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (create) {
            handleCreateBudget(values);
          } else {
            handleUpdateBudget(values);
          }
          setSubmitting(false);
          handleCloseModal();
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
                  {data?.categories
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
              <Form.Group className='margin-bottom-3' controlId='threshold'>
                <Form.Label>Threshold</Form.Label>
                <Form.Control
                  type='number'
                  name='threshold'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.threshold}
                  isInvalid={touched.threshold && errors.threshold}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.threshold}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='margin-bottom-3' controlId='month'>
                <Form.Label>Budget Month</Form.Label>
                <Form.Control
                  type='date'
                  name='month'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.month}
                  isInvalid={touched.month && errors.month}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.month}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant='primary'
                type='submit'
                disabled={!dirty || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              {!create && (
                <Button
                  variant='danger'
                  disabled={isSubmitting}
                  onClick={handleDeleteBudget}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};
