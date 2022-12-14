import React, {useEffect, useState} from 'react';
import AuthorList from "../Components/AuthorList";
import Service from "../API/Service";
import Modal from "../Components/Modal/Modal";
import CreateAuthor from "../Components/CreateAuthorForm/CreateAuthor";

const AuthorsPage = () => {
    const [authors, setAuthors] = useState([])
    const [language, setLanguage] = useState('')
    const [author, setAuthor] = useState('')
    const [languages, setLanguages] = useState([])
    const [update, setUpdate] = useState(0)
    const [isCreate, setIsCreate] = useState(true)
    const [modal, setModal] = useState(false)
    const [authorToChange, setAuthorToChange] = useState()

    async function fetchLang() {
        const response = Service.getLanguages();
        setLanguages([...languages, ...(await response).data])
    }

    async function fetchAuthors() {
        const response = Service.getAuthors(author, language);
        setAuthors([...authors, ...(await response).data])
        //console.log(...(await response).data)
    }

    useEffect(() => {
        fetchLang()
    }, [])

    useEffect(() => {
        setTimeout(() => {
        }, 1000)
        fetchAuthors()
    }, [update, language, author])

    const updateList = () => {
        setAuthors([])
        setUpdate(1 - update)
        console.log("Update")
    }

    const changeCl = (id) => {
        setAuthorToChange(id)
        setModal(true)
        setIsCreate(false)
    }

    const sentRequest = () =>{
        setModal(false)
        //updateList()
    }

    return (
        <div>
            <Modal visible={modal} setVisible={setModal}>
                <CreateAuthor languages={languages} sentRequest={sentRequest} isCreate={isCreate}
                              authorToChange={authorToChange}
                              update={updateList}></CreateAuthor>
            </Modal>
            <select value={language} onChange={e =>{
                setAuthors([])
                setLanguage(e.target.value)
            }

            } className={"input-style"} placeholder={"???????????????? ????????"}>
                <option value={''}>???????????????? ????????</option>
                {languages.map((lang) => <option>{lang.name}</option>)}
            </select>
            <input value={author} onChange={e => {
                setAuthors([])
                setAuthor(e.target.value)
            }}  className={"input-style"} placeholder={"?????? ????????????"}/>
            <button className={"btn-style"} onClick={() => {setModal(true)
                                                            setIsCreate(true)}}>
                ???????????????? ????????????
            </button>
            <AuthorList authors={authors} update={updateList} changeClick={changeCl}/>
        </div>
    );
};

export default AuthorsPage;