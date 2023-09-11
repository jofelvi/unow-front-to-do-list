import React, {useEffect} from 'react';
import ToDoForm from "../../components/ToDo/ToDoForm";
import {useParams} from "react-router-dom";

const UpdateToDo = () => {
    let { taskId } = useParams();

    useEffect(() => {

    }, []);


    return (
        <div>
           <h2> Update TO-DO </h2>
           {/* <ToDoForm mode={"update"} initialValues={initialValues}/>*/}
        </div>
    )
}
export default UpdateToDo;