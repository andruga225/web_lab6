import React, {useEffect, useRef} from 'react';
import Service from "../API/Service";
import QRCode from "qrcode";
import QrCode from "./QrCode.jsx"

const AuthorItem = (props) => {

    const deleteAuthor = (e) =>{
        e.preventDefault()
        Service.deleteAuthor(props.author.id)
        props.updateList()
    }

    const changeAuthor = (e, id) => {
        e.preventDefault()
        props.changeClick(id)
    }


    return (
        <div className={"author"}>
            <div className={"author__content"}>
                <strong>{props.author.name}, {props.author.birthday}</strong><br></br>
                <div>
                    <QrCode author={props.author}></QrCode>
                    <strong>Пишет на следующих языках:</strong>
                    {props.author.languages.map((lang) =>
                        <div>{lang.name}</div>
                    )}
                </div>
            </div>
            <div className={"author__btns"}>
                <button className={"btn-style"} onClick={e => changeAuthor(e, props.author.id)}>Изменить</button>
                <button className={"btn-style"} onClick={deleteAuthor}>Удалить</button>
            </div>
        </div>
    );
};

export default AuthorItem;