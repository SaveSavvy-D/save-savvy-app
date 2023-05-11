import React from 'react';
import Card from 'react-bootstrap/Card';

const DashboardCards = () => {
  return (
    <div className='dashboard-cards-container'>
      <Card className='dashboard-card'>
        <Card.Body>
          <Card.Subtitle className='mb-2 text-muted'>Earnings</Card.Subtitle>
          <Card.Title>Rs 110,000</Card.Title>
        </Card.Body>
      </Card>
      <Card className='dashboard-card'>
        <Card.Body>
          <Card.Subtitle className='mb-2 text-muted'>Expenditure</Card.Subtitle>
          <Card.Title>Rs 35,000</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardCards;
