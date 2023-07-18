import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AlertTable } from './AlertTable';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCreateButton from '../Profile/ProfileCreateButton';
import { STATUSES } from '../../../constants/statuses';
import { useEffect } from 'react';
import { fetchProfile } from '../../../store/profileSlice';

export const Alerts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const { status: profileStatus } = useSelector((state) => state.profile);

  if (profileStatus === STATUSES.ERROR) {
    return <ProfileCreateButton />;
  }

  return (
    <Container>
      <div className='page-header-row'>
        <h2>
          <FontAwesomeIcon icon={faBell} className='margin-right-5' />
          Alerts
        </h2>
      </div>
      <AlertTable setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </Container>
  );
};
