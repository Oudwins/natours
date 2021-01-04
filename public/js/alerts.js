// type = 'success' || 'error'

export const hideAlerts = () => {
  const alerts = document.querySelectorAll('.alert');
  if (alerts) {
    alerts.forEach((alert) => {
      alert.parentNode.removeChild(alert);
    });
  }
};

export const showAlert = (type, message, elementClass) => {
  hideAlerts();
  const markup = `<div class="alert alert--${type}"> ${message} </div>`;
  const el = document.querySelector(elementClass);
  el.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlerts, 5000);
};
