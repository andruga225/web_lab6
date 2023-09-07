import React from 'react';
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return (
        <div className={"nav-bar"}>
            <Link className={"nav-bar-links"} to={"/unreadBooks"}>Непрочитанные книги</Link>
            <Link className={"nav-bar-links"} to={"/readiedBooks"}>Прочитанные книги</Link>
            <Link className={"nav-bar-links"} to={"/authors"}>Авторы</Link>
        </div>
    );
};

export default NavigationBar;