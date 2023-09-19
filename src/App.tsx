import React from 'react';
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import CreateToDo from "./views/TodoPages/createToDoPage";
import DetailsToDo from "./views/TodoPages/detailsToDo";
import ListToDoPage from "./views/TodoPages/listToDoPage";
import NotFound from "./views/notFountPage/NotFound";
import UpdateToDo from "./views/TodoPages/updateToDo";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<ListToDoPage/>} />
                <Route path="/details-To-do/:taskId" element={<DetailsToDo/>} />
                <Route path="/update-To-do/:taskId" element={<UpdateToDo/>} />
                <Route path="create-To-do" element={<CreateToDo/>} />
                <Route path="*" element={<NotFound/>} />
            </Route>
        </Routes>
    </>
  );
}

export default App;
