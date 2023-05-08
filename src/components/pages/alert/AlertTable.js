import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUSES } from '../../../constants/statuses';
import ToastColors from '../../../constants/toastColors';
import { fetchBudgetAlerts } from '../../../store/alertSlice';
import { showAllNotifications } from '../../../utils/notificationHelper';
import { AppSpinner } from '../../common/AppSpinner';
import { Alert } from './Alert';

export const AlertTable = ({ currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, status, errors } = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch(fetchBudgetAlerts(id));
  }, [dispatch, id]);

  const getResults = (pageNum) => {
    setCurrentPage(pageNum);
    dispatch(fetchBudgetAlerts(id, pageNum));
  };

  if (status === STATUSES.LOADING) {
    return <AppSpinner />;
  }
  if (status === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    showAllNotifications(errorArray, ToastColors.error);
  }

  return (
    <>
      <Table className='table-text' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Threshold Limit</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.alerts?.length ? (
            data?.alerts?.map((alert, index) => (
              <Alert
                key={alert?._id}
                alert={alert}
                index={index}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            ))
          ) : (
            <tr>
              <td colSpan='5'>There are no items to display</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Container className='table-navigators'>
        {currentPage > 1 && (
          <Button onClick={() => getResults(currentPage - 1)} variant='link'>
            Previous
          </Button>
        )}
        {data?.remainingRecords > 0 && (
          <Button variant='link' onClick={() => getResults(currentPage + 1)}>
            Next
          </Button>
        )}
      </Container>
    </>
  );
};
