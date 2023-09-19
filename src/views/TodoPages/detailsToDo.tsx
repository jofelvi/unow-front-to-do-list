import React, {useEffect, useReducer, useState} from 'react';
import ToDoForm from "../../components/ToDo/ToDoForm";
import {useParams} from "react-router-dom";
import TaskService, {Task} from "../../services/ToDo";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {fetchByIdTodosSuccess, setLoading} from "../../store/slices/todoSlice";
import {RootState} from "../../store";

const DetailsToDo = () => {
    let { taskId } = useParams();
    const taskService = new TaskService();
    const [task, setTask] = useState<Task>()
    const dispatch = useDispatch();
    const { detailToDo, loading, toogleToDo } = useSelector((state: RootState) => state.toDo);

    useEffect(() => {
        getTask()
    }, []);
    const getTask = async ()=>{
        dispatch(setLoading(true));
       try {
           let task = await  taskService.getTaskById(taskId)
           dispatch(fetchByIdTodosSuccess(task));
       }catch (e){
           throw e
       }finally {
           dispatch(setLoading(false));
       }
    }

    if (loading){
        <div>Is Loading....</div>
    }
    return (
        <div>
           <h2> DetailsTodo</h2>
            {detailToDo !== null ? <ToDoForm mode={"details"}/> : null}
        </div>
    )
}
export default DetailsToDo;