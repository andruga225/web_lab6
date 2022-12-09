import React, {useEffect, useState} from "react";
import './Styles/App.css';
import Service from "./API/Service";
import BookItem from "./Components/BookItem";
import BookList from "./Components/BookList";
import UnreadBooksPage from "./Pages/UnreadBooksPage";
import ReadiedBooksPage from "./Pages/ReadiedBooksPage";
import AuthorsPage from "./Pages/AuthorsPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import unreadBooksPage from "./Pages/UnreadBooksPage";
import authorsPage from "./Pages/AuthorsPage";
import NavigationBar from "./Components/NavigationBar/NavigationBar";

function App(){

    return (
        <div>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path="/unreadBooks" element = {<UnreadBooksPage/>}/>
                    <Route path="/readiedBooks" element = {<ReadiedBooksPage/>}/>
                    <Route path="/authors" element = {<AuthorsPage/>}/>
                    <Route path="*" element={<Navigate replace to="/unreadBooks"/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;