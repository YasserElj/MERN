import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { Alert as BootstrapAlert } from 'react-bootstrap'; // Alias Alert

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <BootstrapAlert key={alert.id} variant={alert.type || 'info'} className="mt-2">
        <i className='fas fa-info-circle'></i> {alert.msg}
      </BootstrapAlert>
    ))
  );
};

export default Alerts; 