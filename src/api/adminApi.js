import axios from 'axios';

const token = localStorage.getItem("adminToken");
// const token = localStorage.getItem("Token");
console.log("adminToken : : : ", token)
const apiClient = axios.create({
  // baseURL: 'http://13.209.62.0/api',  // Replace with your API URL
  // http://localhost:8080/43.202.166.221
  baseURL: 'https://13.124.62.68:3000/api/',
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
    'Authorization': `Bearer `+ token
  }
});

export default {
  // getTasks() {
  //   return apiClient.get('/tasks');
  // },
  getTaskAdmin(path,id) {
    console.log('조회 GET 통신 === 매니저')
    return apiClient.get(path);
  },
  postTaskAdmin(task,params) {
    console.log('조회 POST 통신 === 매니저')
    return apiClient.post(task,params);
  },
  updateTaskAdmin(path, params) {
    console.log('update POST 통신 === 매니저')
    return apiClient.patch(path, params);
  },
  deleteTaskAdmin(path) {
    console.log('delete POST 통신 === 매니저')
    return apiClient.delete(path);
  }
};
