const address = 'http://192.168.1.41:8000/api/v1/';
const token = localStorage.getItem('token');
export const api = {
  //Forms
  workOrderForm: {
    fetch(id) {
      return fetch(`${address}jems/m2/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        }
      });
    }
  }
};
