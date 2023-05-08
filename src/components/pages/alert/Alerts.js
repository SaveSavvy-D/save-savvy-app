import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AlertTable } from './AlertTable';

export const Alerts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Container>
        <div className='page-header-row'>
          <h2>
            <FontAwesomeIcon icon={faBell} className='margin-right-5' />
            Alerts
          </h2>
        </div>
        <AlertTable setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </Container>
    </>
  );
};
