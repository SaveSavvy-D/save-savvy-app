import React from 'react';
import Card from 'react-bootstrap/Card';
import formatAmount from '../../../utils/currencyFormatter';
import { getDate } from '../../../utils/dateHelper';

const DashboardCards = ({ expenditure, profile }) => {
  const currentMonthEarnings = () => {
    const currentMonthEarning = profile?.earningDetails.find(
      (earning) => earning.date.split('-')[1] === getDate().month
    );
    return currentMonthEarning ? currentMonthEarning.amount : 0;
  };

  return (
    <div className='dashboard-cards-container'>
      <Card className='dashboard-card'>
        <Card.Body>
          <Card.Subtitle className='mb-2 text-muted'>Earnings</Card.Subtitle>
          <Card.Title>
            {profile?.currency
              ? formatAmount(currentMonthEarnings(), profile?.currency)
              : '-'}
          </Card.Title>
        </Card.Body>
      </Card>
      <Card className='dashboard-card'>
        <Card.Body>
          <Card.Subtitle className='mb-2 text-muted'>Expenditure</Card.Subtitle>
          <Card.Title>
            {profile?.currency
              ? formatAmount(expenditure, profile.currency)
              : '-'}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCards;
