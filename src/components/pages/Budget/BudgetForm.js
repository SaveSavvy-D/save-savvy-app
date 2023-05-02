import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { BudgetSchema } from '../../../utils/yup/schemas';

export const BudgetForm = ({
  budget,
  handleCloseModal,
  handleUpdateBudget,
  categories,
}) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          categoryTitle: budget?.categoryId?.title || '',
          threshold: budget?.threshold || '',
          startDate: budget?.startDate?.substring(0, 10) || '',
          endDate: budget?.endDate?.substring(0, 10) || '',
        }}
        validationSchema={BudgetSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleUpdateBudget(values);
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
              <Form.Group controlId="categoryTitle">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryTitle}
                  isInvalid={touched.categoryTitle && errors.categoryTitle}
                >
                  <option value={values.categoryTitle}>
                    {values.categoryTitle}
                  </option>
                  {categories
                    .filter(
                      (category) => category.title !== values.categoryTitle
                    )
                    .map((category) => (
                      <option key={category._id} value={category.title}>
                        {category.title}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryTitle}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="threshold">
                <Form.Label>Threshold</Form.Label>
                <Form.Control
                  type="number"
                  name="threshold"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.threshold}
                  isInvalid={touched.threshold && errors.threshold}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.threshold}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.startDate}
                  isInvalid={touched.startDate && errors.startDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endDate}
                  isInvalid={touched.endDate && errors.endDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.endDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </>
  );
};
