import React from 'react';
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import CreateToDo from "./pages/TodoPages/createToDoPage";
import DetailsToDo from "./pages/TodoPages/detailsToDo";
import ListToDoPage from "./pages/TodoPages/listToDoPage";
import NotFound from "./pages/notFountPage/NotFound";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<ListToDoPage/>} />
                <Route path="details-To-do" element={<DetailsToDo/>} />
                <Route path="list-To-do" element={<CreateToDo/>} />
                <Route path="*" element={<NotFound/>} />
            </Route>
        </Routes>
    </>
  );
}

export default App;
