import React, {useEffect} from 'react';
import ToDoForm from "../../components/ToDo/ToDoForm";
import {useParams} from "react-router-dom";
import {TaskCategory, TaskPriority} from "../../services/ToDo";

const DetailsToDo = () => {
    let { taskId } = useParams();

    useEffect(() => {

    }, []);



    return (
        <div>
           <h2> DetailsTodo</h2>

           {/* <ToDoForm mode={"details"} initialValues={initialValues}/>*/}
        </div>
    )
}
export default DetailsToDo;