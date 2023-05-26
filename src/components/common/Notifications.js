import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { STATUSES } from '../../constants/statuses';
import { AppSpinner } from './AppSpinner';
import '../css/Header.css';
import {
  deleteNotification,
  updateNotification,
} from '../../store/notificationSlice';

export const Notifications = () => {
  const {
    data: notifications,
    status: notificationStatus,
    errors,
  } = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const handleMarkAsRead = (notification) => {
    dispatch(
      updateNotification({
        id: notification._id,
        updatedBody: { ...notification, read: true },
      })
    );
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification({ id: notificationId }));
  };

  if (notificationStatus === STATUSES.LOADING) {
    return <AppSpinner />;
  }

  if (notificationStatus === STATUSES.ERROR) {
    const errorArray = errors.map((error) => error.msg);
    return (
      <div className='dropdown-menu-wrapper'>
        <ul style={{ listStyle: 'none' }}>
          {errorArray.map((error, index) => (
            <li key={index} className='text-muted'>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className='dropdown-menu-wrapper'>
      {notifications?.notifications?.map((notification, index) => (
        <Card
          key={notification?._id}
          className={`${
            notification?.read ? 'readNotification' : 'unReadNotification'
          } notificationCards`}
        >
          <Card.Body>
            <Card.Title>Category</Card.Title>
            <Card.Text>{notification?.message}</Card.Text>
            <Card.Subtitle className='mb-2 text-muted'>
              {notification?.date.substring(0, 10) ||
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  0
                ).toLocaleDateString('en-CA')}
            </Card.Subtitle>
            <Card.Link
              onClick={() => {
                handleMarkAsRead(notification);
              }}
            >
              Mark as Read
            </Card.Link>
            <Card.Link onClick={() => handleDelete(notification._id)}>
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
