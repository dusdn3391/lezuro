// api/taskApi.js
import axios from 'axios';

const token = localStorage.getItem("Token");
console.log("token : : : ", token)
const apiClient = axios.create({
  // baseURL: 'http://13.209.62.0/api',  // Replace with your API URL
  // http://localhost:8080/
  baseURL: 'https://13.124.62.68:3000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

export default {
  // getTasks() {
  //   return apiClient.get('/tasks');
  // },
  getTask(path,id) {
    console.log('조회 GET 통신')
    return apiClient.get(path);
  },
  postTask(task,params) {
    console.log('조회 POST 통신')
    return apiClient.post(task,params);
  },
  updateTask(path, params) {
    console.log('update POST 통신')
    return apiClient.patch(path, params);
  },
  deleteTask(path) {
    console.log('delete POST 통신')
    return apiClient.delete(path);
  },
  putTask(path,params) {
    console.log('put POST 통신')
    return apiClient.put(path,params);
  }
};
