import React from 'react';
import { BudgetTable } from './BudgetTable';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../../../App.css';

export const Budgets = () => {
  return (
    <Container>
      <div className="page-header-row">
        <h2>
          <FontAwesomeIcon icon={faPenToSquare} className="margin-right-5" />
          Budgets
        </h2>
        <Button variant="success" className="bg-color-green">
          + Add Budget
        </Button>
      </div>
      <BudgetTable />
    </Container>
  );
};
