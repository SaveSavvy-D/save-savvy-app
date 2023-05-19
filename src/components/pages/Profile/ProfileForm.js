import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { ProfileSchema } from '../../../utils/yup/schemas';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, updateProfile } from '../../../store/profileSlice';

const ProfileForm = () => {
  const { profile } = useSelector((state) => state.profile);
  const dispath = useDispatch();
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    if (!profile) dispath(createProfile(values));
    else {
      const { _id } = profile;
      dispath(updateProfile({ values, _id }));
    }

    setSubmitting(false);
    resetForm();
  };
  return (
    <div className='d-flex w-100 justify-content-center'>
      <Formik
        initialValues={{
          name: profile ? profile.name : '',
          currency: profile ? profile.currency : '',
          earningDetails: profile
            ? profile.earningDetails.map((detail) => ({
                ...detail,
                date: detail.date,
              }))
            : [],
        }}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form className='w-75 py-5'>
              <p className='fs-2 '>
                {profile ? 'Edit Profile' : 'Create Profile'}
              </p>
              <div className='d-flex flex-column gap-4 bg-white shadow px-5 pt-5 pb-4'>
                <div className='d-flex flex-row'>
                  <label className='w-20'>Name</label>
                  <Field
                    type='name'
                    name='name'
                    className='w-50 py-1 px-2 border border-1 bg-light rounded'
                  />
                  <ErrorMessage
                    name='name'
                    className='text-danger'
                    component='div'
                  />
                </div>
                <div className='d-flex flex-row'>
                  <label className='w-20'>Currency</label>
                  <Field
                    type='currency'
                    name='currency'
                    className='w-50 my-1 px-2 input border border-1 bg-light rounded'
                  />
                  <ErrorMessage
                    name='currency'
                    className='text-danger'
                    component='div'
                  />
                </div>
                <div className='d-flex'>
                  <p className='w-20'>Earning Details</p>
                  <div className=' d-flex justify-content-center w-80'>
                    <table className='earning-details-table d-flex flex-column w-100 bg-white fs-6'>
                      <FieldArray
                        name='earningDetails'
                        render={(arrayHelpers) => (
                          <div className='d-flex flex-column bg-light p-3'>
                            <table>
                              <div className='d-flex mt-3 justify-content-end mx-5'>
                                <button
                                  type='button'
                                  className='rounded border-0 btn-green text-white py-1 px-2'
                                  onClick={() =>
                                    arrayHelpers.push({
                                      date: new Date()
                                        .toISOString()
                                        .substring(0, 7),
                                      amount: 0,
                                    })
                                  }
                                >
                                  + Add Earning Details
                                </button>
                              </div>
                              <tr>
                                <th>Month</th>
                                <th>Amount</th>
                                <th></th>
                              </tr>

                              {values.earningDetails.map(
                                (earningDetail, index) => (
                                  <tr key={earningDetail._id}>
                                    <td>
                                      <Field
                                        name={`earningDetails.${index}.date`}
                                        type='month'
                                      />
                                    </td>
                                    <td>
                                      <Field
                                        name={`earningDetails.${index}.amount`}
                                        type='number'
                                        value={earningDetail.amount}
                                      />
                                    </td>
                                    <td>
                                      <button
                                        type='button'
                                        className='border-0 bg-light-red text-white rounded'
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                )
                              )}
                            </table>
                          </div>
                        )}
                      />
                    </table>
                  </div>
                </div>
                <div className='w-100 d-flex justify-content-end'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='border border-0 btn-green text-white mt-3 rounded px-2 py-1'
                  >
                    {profile ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileForm;
