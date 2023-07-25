import React, {useEffect} from 'react';
import ToDoForm from "../../components/ToDo/ToDoForm";
import {useParams} from "react-router-dom";

const UpdateToDo = () => {
    let { taskId } = useParams();

    useEffect(() => {

    }, []);

    const initialValues = {
        task: 'Task 1',
        description: 'Description 1',
        category: 'Category 1',
        when: new Date('2023-07-25'),
        priority: 'High',
        status: 'Pending',
    };

    return (
        <div>
           <h2> Update TO-DO </h2>
            <ToDoForm mode={"update"} initialValues={initialValues}/>
        </div>
    )
}
export default UpdateToDo;