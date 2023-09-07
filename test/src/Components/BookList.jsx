import React, {useState} from 'react';
import BookItem from "./BookItem";

const BookList = ({books, update, changeClick}) => {
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
            {books.map((book) => <BookItem updateList={updateList} changeClick={changeCl} book={book} key={book.id}/>)}
        </div>
    );
};

export default BookList;