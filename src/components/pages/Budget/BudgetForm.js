import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { BudgetSchema } from '../../../utils/yup/schemas';
import { updateBudget, createBudget } from '../../../store/budgetSlice';
import '../../../App.css';

export const BudgetForm = ({
  budget,
  handleCloseModal,
  categories,
  create,
}) => {
  const dispatch = useDispatch();

  const createPayload = (values) => {
    const categoryId = categories.filter(
      (category) => category.title === values.categoryTitle
    );

    return { ...values, categoryId: categoryId[0]._id };
  };

  const handleCreateBudget = (values) => {
    const payload = createPayload(values);
    dispatch(createBudget({ newData: payload }));
  };

  const handleUpdateBudget = (values) => {
    const payload = createPayload(values);
    dispatch(
      updateBudget({
        id: budget?._id,
        newData: payload,
      })
    );
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
          startDate: budget?.startDate?.substring(0, 10) || '',
          endDate: budget?.endDate?.substring(0, 10) || '',
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="margin-bottom-3" controlId="categoryTitle">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryTitle"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryTitle}
                  isInvalid={touched.categoryTitle && errors.categoryTitle}
                >
                  <option value={values.categoryTitle || ''}>
                    {values.categoryTitle || 'Select a category title'}
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
              <Form.Group className="margin-bottom-3" controlId="threshold">
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
              <Form.Group className="margin-bottom-3" controlId="startDate">
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
              <Form.Group className="margin-bottom-3" controlId="endDate">
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
