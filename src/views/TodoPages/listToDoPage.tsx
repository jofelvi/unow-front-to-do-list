import React, {useEffect, useReducer, useState} from "react";
import ListToDo from "../../components/ToDo/ListToDo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import TaskService from "../../services/ToDo";
import {
  fetchAllTodosSuccess,
  fetchByIdTodosSuccess,
  setLoading,
} from "../../store/slices/todoSlice";
import ToDoForm from "../../components/ToDo/ToDoForm";

const ListToDoPage = () => {
  const { toogleToDo, loading,data  } = useSelector((state: RootState) => state.toDo);
  const taskService = new TaskService();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("cambio toogle",toogleToDo )
    getAllTask();
  }, [toogleToDo]);

  const getAllTask = async () => {
    let task = await taskService.getAllTasks();
    dispatch(fetchAllTodosSuccess(task));
    dispatch(setLoading(false));
  };

  return (
    <div>
      <h2> ListToDo </h2>
        <ListToDo />
    </div>
  );
};
export default ListToDoPage;
