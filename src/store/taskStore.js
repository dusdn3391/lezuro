// store/taskStore.js
import { reactive } from 'vue';
import taskApi from '../api/taskApi';

export const taskStore = reactive({
  tasks: [],
  loading: false,
  error: null,

  async getSelectTasks(path) {
    this.loading = true;
    try {
      console.log("GET ---> 데이터 값 확인" ,path);
      this.tasks = [];
      const response = await taskApi.getTask(path);
      this.tasks = response.data;
      console.log('GET ---> response 확인 중' + JSON.stringify(response))
      return response.data;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  },

  async postTask(task,params) {
    try {
      const response = await taskApi.postTask(task,params);
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
      const response = await taskApi.updateTask(id, task);
        return response
    } catch (error) {
      this.error = error;
    }
  },

  async deleteTask(id) {
    try {
      await taskApi.deleteTask(id);
      return this.tasks;
    } catch (error) {
      this.error = error;
    }
  },

  async putTask(id,params) {
    try {
      await taskApi.putTask(id,params);
      return this.tasks;
    } catch (error) {
      this.error = error;
    }
  }
});
