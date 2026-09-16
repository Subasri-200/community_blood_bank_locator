import React from 'react';

const AvailabilityBadge = ({ status, units }) => {
  let badgeClass = 'badge-not-available';
  let text = status || 'Not Available';

  if (status === 'Available' || (units !== undefined && units >= 10)) {
    badgeClass = 'badge-available';
    text = 'Available';
  } else if (status === 'Low' || (units !== undefined && units >= 1 && units < 10)) {
    badgeClass = 'badge-low';
    text = 'Low Stock';
  } else {
    badgeClass = 'badge-not-available';
    text = 'Not Available';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {text} {units !== undefined ? `(${units} units)` : ''}
    </span>
  );
};

export default AvailabilityBadge;
