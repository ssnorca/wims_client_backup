export const getUsersFromApiAsync = () =>
  fetch('http://localhost:8000/api/employee/')
    .then((response) => response.json());