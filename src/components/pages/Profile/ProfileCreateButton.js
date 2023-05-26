import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfileCreateButton = () => {
  return (
    <div className='create-profile-container'>
      <Form className='w-75 py-5'>
        <p className='fs-2 '>Create your profile</p>
        <div className='d-flex gap-4 bg-white shadow px-5 pt-5 pb-4'>
          <div className='d-flex justify-content-center w-100'>
            <FontAwesomeIcon
              icon={faUser}
              size='3x'
              style={{ color: 'green' }}
            />
          </div>
          <div className=' d-flex justify-content-center w-100'>
            <Button variant='success' className='bg-color-green w-50'>
              <Link className='create-profile-button' to='/profile'>
                Create A Profile
              </Link>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProfileCreateButton;
