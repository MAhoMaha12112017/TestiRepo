import axios from 'axios';
// const baseUrl = 'http://localhost:3001/persons';  // with JSON Server
// const baseUrl = 'http://localhost:3001/api/persons'; // with cors and node
const baseUrl = '/api/persons'; // with Heroku

const getAll = () => {
  return axios.get(baseUrl).then((r) => r.data);
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((r) => r.data);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((r) => r.data);
}

export default { getAll, create, deletePerson, update } 