import React, {useEffect, useState} from 'react';
import Service from "../API/Service";
import BookList from "../Components/BookList";
import Select from "react-select/base";
import Modal from "../Components/Modal/Modal";
import CreateBook from "../Components/CreateBookForm/CreateBook";

const UnreadBooksPage = () => {
    const [books, setBooks] = useState([])
    const [update, setUpdate] = useState(0)
    const [languages, setLanguages] = useState([])
    const [language, setLanguage] = useState('')
    const [modal, setModal] = useState(false)
    const [authors, setAuthors] = useState([])
    const [isCreate, setIsCreate] = useState(true)
    const [bookToChange, setBookToChange] = useState()
    const isReadied = false
    const [author, setAuthor] = useState('')

    async function fetchBooks(){
        const response = Service.getBooks(language, isReadied, author);
        setBooks([...books, ...(await response).data])
    }

    async function fetchLang(){
        const response = Service.getLanguages();
        setLanguages([...languages, ...(await response).data])
    }

    async function fetchAuthors(){
        const response = Service.getAllAuthors();
        setAuthors([...authors, ...(await response).data])
    }

    useEffect(() => {
        fetchAuthors()
    }, [])

    useEffect(() => {
        fetchLang()
    },[])

    useEffect(() => {
        fetchBooks()
    }, [update, language, author])

    const updateList = () =>
    {
        //setTimeout(() => {}, 1000)
        setBooks([])
        setUpdate(1-update)
        console.log("Update")
    }

    const sentReq = () =>
    {
        setModal(false)
    }

    const changeCl = (id) =>
    {
        setBookToChange(id)
        console.log(bookToChange)
        setModal(true)
        setIsCreate(false)
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal} >
                <CreateBook update={updateList} languages={languages} sentRequest={sentReq} authors={authors} is_create={isCreate} bookToChange={bookToChange}></CreateBook>
            </Modal>
            <select value={language} onChange={e =>{
                setBooks([])
                setLanguage(e.target.value)
            }

            } className={"input-style"} placeholder={"Выберите язык"}>
                <option value={''}>Выберите язык</option>
                {languages.map((lang) => <option>{lang.name}</option>)}
            </select>
            <input value={author} onChange={e => {
                setBooks([])
                setAuthor(e.target.value)
            }}  className={"input-style"} placeholder={"Имя автора"}/>
            <button className={"btn-style"} onClick={() => {setModal(true)
                                                            setIsCreate(true)}}>
                Добавить книгу
            </button>
            <BookList update={updateList} changeClick={changeCl} books={books}/>
        </div>
    )
};

export default UnreadBooksPage;