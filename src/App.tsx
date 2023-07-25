import React from 'react';
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import CreateToDo from "./pages/TodoPages/createToDoPage";
import DetailsToDo from "./pages/TodoPages/detailsToDo";
import ListToDoPage from "./pages/TodoPages/listToDoPage";
import NotFound from "./pages/notFountPage/NotFound";
import UpdateToDo from "./pages/TodoPages/updateToDo";

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
