import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';

import { AlertSchema } from '../../../utils/yup/schemas';
import {
  createAlert,
  deleteAlert,
  fetchBudgetAlerts,
  updateAlert,
} from '../../../store/alertSlice';
import { useParams } from 'react-router-dom';

export const AlertForm = ({
  alert,
  showModal,
  budgetId,
  handleCloseModal,
  create,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const resetTable = () => {
    setCurrentPage(1);
    dispatch(fetchBudgetAlerts(id));
  };

  const handleCreateAlert = (values) => {
    dispatch(createAlert({ newData: values }));
  };

  const handleUpdateBudget = async (values) => {
    await dispatch(updateAlert({ id: alert._id, newData: values }));
    resetTable();
  };

  const handleDeleteBudget = async (values) => {
    await dispatch(deleteAlert({ id: alert._id }));
    resetTable();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            title: alert?.title || '',
            description: alert?.description || '',
            thresholdPercentage: alert?.thresholdPercentage || '',
            date:
              alert?.date?.substring(0, 10) ||
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
              ).toLocaleDateString('en-CA'),
            budgetId: budgetId,
          }}
          validationSchema={AlertSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (create) {
              handleCreateAlert(values);
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className='margin-bottom-3' controlId='threshold'>
                  <Form.Label>Alert Title</Form.Label>
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
                <Form.Group className='margin-bottom-3' controlId='threshold'>
                  <Form.Label>Alert Description</Form.Label>
                  <Form.Control
                    type='text'
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    isInvalid={touched.description && errors.description}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.thresholdPercentage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='margin-bottom-3' controlId='threshold'>
                  <Form.Label>Threshold Percentage</Form.Label>
                  <Form.Control
                    type='text'
                    name='thresholdPercentage'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.thresholdPercentage}
                    isInvalid={
                      touched.thresholdPercentage && errors.thresholdPercentage
                    }
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.thresholdPercentage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='margin-bottom-3' controlId='date'>
                  <Form.Label>Alert Date</Form.Label>
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
                {!create && (
                  <Button
                    variant='danger'
                    disabled={isSubmitting}
                    onClick={handleDeleteBudget}
                    type='submit'
                  >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
