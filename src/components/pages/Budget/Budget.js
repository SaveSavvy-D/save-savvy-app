import React from 'react';

export const Budget = ({ index, budget, currentPage }) => {
  return (
    <>
      <tr>
        <td>{index + 1 + (currentPage.current - 1) * 5}</td>
        <td>{budget?.categoryId.title}</td>
        <td>{budget?.threshold}</td>
        <td>{budget?.startDate.substring(0, 10)}</td>
        <td>{budget?.endDate.substring(0, 10)}</td>
      </tr>
    </>
  );
};
