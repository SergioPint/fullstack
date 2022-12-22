import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const deleteOne = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  console.log(id, newObject);
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => {
    console.log(response);
    return response.data;
  });
};

const phoneService = { getAll, create, deleteOne, update };

export default phoneService;
