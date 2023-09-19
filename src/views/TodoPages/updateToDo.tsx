import React, {useEffect, useState} from 'react';
import ToDoForm from "../../components/ToDo/ToDoForm";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {fetchByIdTodosSuccess, setLoading} from "../../store/slices/todoSlice";
import moment from "moment/moment";
import TaskService, {Task} from "../../services/ToDo";

const UpdateToDo = () => {
    let { taskId } = useParams();
    const taskService = new TaskService();
    const [task, setTask] = useState<Task>()
    const dispatch = useDispatch();
    const { detailToDo, loading, toogleToDo } = useSelector((state: RootState) => state.toDo);

    useEffect(() => {
        getTask()
    }, [toogleToDo]);

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
    return (
        <div>
           <h2> Update TO-DO {loading} </h2>
            {detailToDo !== null ? <ToDoForm mode={"update"}/> : null}
        </div>
    )
}
export default UpdateToDo;