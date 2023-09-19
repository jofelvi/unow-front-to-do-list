import axios, { AxiosResponse } from "axios";
import { urlBase } from "../shared/constans";

export type Task = {
  id?: number;
  title?: string | null;
  description?: string | null;
  category?: TaskCategory | null;
  priority?: TaskPriority | null;
  status?: boolean;
  date?: string;
};

export enum TaskCategory {
  Comida = "Comida",
  Tareas = "Tareas",
  Trabajo = "Trabajo",
  Familia = "Familia",
}

export enum TaskPriority {
  Alta = "Alta",
  Media = "Media",
  Baja = "Baja",
}

export default class TaskService {
  private baseURL = urlBase;
  async getAllTasks(): Promise<Task[]> {
    try {
      const response: AxiosResponse<Task[]> = await axios.get(
        `${this.baseURL}/ToDo`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error}`);
    }
  }

  async createTask(newTask: Task): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await axios.post(
        `${this.baseURL}/ToDo`,
        newTask
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error creating task: ${error}`);
    }
  }

  async getTaskById(id: any): Promise<Task> {
    try {
      const response: AxiosResponse<Task> = await axios.get(
        `${this.baseURL}/ToDo/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error updating task: ${error}`);
    }
  }
  async updateTask(updatedTask: Task): Promise<Task> {
    try {
      console.log("------------------------")
      console.log(updatedTask)
      const response: AxiosResponse<Task> = await axios.put(
        `${this.baseURL}/ToDo/${updatedTask.id}`,
        updatedTask
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error updating task: ${error}`);
    }
  }

  async deleteTask(taskId: number | undefined): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/ToDo/${taskId}`);
    } catch (error) {
      throw new Error(`Error deleting task: ${error}`);
    }
  }
}
