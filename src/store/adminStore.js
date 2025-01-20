// store/taskStore.js
import { reactive } from 'vue';
import adminApi from '../api/adminApi';

export const adminStore = reactive({
  tasks: [],
  loading: false,
  error: null,

  async getTask(path) {
    this.loading = true;
    try {
      console.log("GET ---> 데이터 값 확인" ,path);
      const response = await adminApi.getTaskAdmin(path);
      // this.tasks = response.data;
      console.log('GET ---> response 확인 중' + JSON.stringify(response))
      return response.data;
    } catch (error) {
      console.log("Error" , error)
      this.error = error;
    } finally {
      this.loading = false;
    }
  },

  async postTask(task,params) {
    try {
      const response = await adminApi.postTaskAdmin(task,params);
      this.tasks.push(response.data);
      console.log('response 확인 중' + JSON.stringify(response))
      // console.log('this.tasks 확인 중' + JSON.stringify(this.tasks))
      return this.tasks;
    } catch (error) {
      this.error = error;
    }
  },

  async updateTask(id, task) {
    try {
      const response = await adminApi.updateTaskAdmin(id, task);
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1, response.data);
      }
    } catch (error) {
      this.error = error;
    }
  },

  async deleteTask(id) {
    try {
      await adminApi.deleteTaskAdmin(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
    } catch (error) {
      this.error = error;
    }
  }
});
