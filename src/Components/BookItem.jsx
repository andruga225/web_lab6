import React, {useCallback} from 'react';
import axios from "axios";
import Service from "../API/Service";

const BookItem = (props) => {

    const deleteBook = (e) =>{
        e.preventDefault()
        Service.deleteBook(props.book.id)
        props.updateList()
    }

    const changeBook = (e, id) =>{
        e.preventDefault()
        props.changeClick(id)
    }

    return (
        <div className={"book"}>
            <div className={"book__content"}>
                <strong>{props.book.name}, {props.book.year}</strong>
                <div >
                    {props.book.authors.map((author) =>
                    <div>{author.name}</div>)}
                </div>
                <div>
                    {props.book.language.name}
                </div>
            </div>
            <div className={"book__btns"}>
                <button className={"btn-style"} onClick={e => changeBook(e, props.book.id)}>Изменить</button>
                <button className={"btn-style"} onClick={deleteBook}>Удалить</button>
            </div>
        </div>
    );
};

export default BookItem;