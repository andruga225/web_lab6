import React, {useState} from 'react';
import AuthorItem from "./AuthorItem";

const AuthorList = ({authors, update, changeClick}) => {
    const [updateLs, setUpdate] = useState(0)
    const updateList = () => {
        update()
        setUpdate(1-updateLs)
    }

    const changeCl = (id) => {
        changeClick(id)
        //console.log("Change")
    }

    return (
        <div>
            {authors.map((author) => <AuthorItem updateList={updateList} changeClick={changeCl} author={author} key={author.id}/>)}
        </div>
    );
};

export default AuthorList;