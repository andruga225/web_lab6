import React, {useEffect, useState} from 'react';
import cl from './CreateBook.module.css'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import Service from "../../API/Service";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBook = ({languages, sentRequest, authors, is_create, update, bookToChange}) => {
    const [schema, setSchema] = useState()
    // if(is_create){
    //     setSchema(yup.object().shape({
    //         // name: yup.string().required(toast.error("Название книги должно быть заполнено")),
    //         // year: yup.number().positive().integer().required(toast.error("Год написания книги должен быть указан")),
    //         // lang: yup.string().required(toast.error("Язык книги должен быть выбран")),
    //         // is_readied: yup.boolean().required(toast.error("Укажите, прочитана ли книга")),
    //         // authors: yup.array(yup.string()).min(1).required(toast.error("Укажите авторов книги"))
    //         name: yup.string().required(),
    //         year: yup.number().positive().integer().required(),
    //         lang: yup.string().required(),
    //         is_readied: yup.boolean().required(),
    //         authors: yup.array(yup.string()).min(1).required()
    //     }))
    // }else{
    //      setSchema(yup.object().shape({
    //         name: yup.string(),
    //         year: yup.string(),
    //         lang: yup.string(),
    //         is_readied: yup.boolean(),
    //         authors: yup.array(yup.string())
    //     }))
    // }
    //console.log({is_create})

    useEffect(() => {
        if(is_create){
            setSchema(yup.object().shape({
                // name: yup.string().required(toast.error("Название книги должно быть заполнено")),
                // year: yup.number().positive().integer().required(toast.error("Год написания книги должен быть указан")),
                // lang: yup.string().required(toast.error("Язык книги должен быть выбран")),
                // is_readied: yup.boolean().required(toast.error("Укажите, прочитана ли книга")),
                // authors: yup.array(yup.string()).min(1).required(toast.error("Укажите авторов книги"))
                name: yup.string().required("Имя обязательно"),
                year: yup.number().positive().integer().required(),
                lang: yup.string().required(),
                is_readied: yup.boolean().required(),
                authors: yup.array(yup.string()).min(1).required()
            }))
        }else{
            setSchema(yup.object().shape({
                name: yup.string(),
                year: yup.string(),
                lang: yup.string(),
                is_readied: yup.boolean(),
                authors: yup.array(yup.string())
            }))
        }
        console.log({is_create})
    }, [is_create])

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [language, setLanguage] = useState()
    const [readied, setReadied] = useState()
    const [author, setAuthor] = useState()

    async function addValue(data){
        console.log("Hello")
        schema.validate(data, {abortEarly: false}).then(() => {})
            .catch((err) => {
                err.inner.forEach(e => {
                    toast.error(e.message)
                })
            })
        if(is_create) {
            //const response = await Service.postBook(data)
            console.log(data)
        }else{
            //const response = await Service.putBook(bookToChange, data)
            console.log(data)
        }
        sentRequest()
        update()
    }


    return (
        <form onSubmit={handleSubmit(addValue)}>
            <ToastContainer/>
            <input  {...register("name")}
                    placeholder={"Название книги"}/>

            <input {...register("year")}
                   placeholder={"Год написания"} />
            <label>Язык книги</label>
            <select value={language}
                    onChange={e =>{
                            setLanguage(e.target.value)
                             }}
                    {...register("lang")}>
                {languages.map((lang) => <option>{lang.name}</option>)}
            </select>
            <label>Книга прочитана?</label>
            <select defaultValue={undefined} value={readied}
                    onChange={e => {
                            setReadied(e.target.value)
                    }}
                    {...register("is_readied")}> :
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
            </select>
            <select multiple={true}
                    value={author}
                    onChange={e =>{
                            setAuthor(e.target.value)
                    }}
                    {...register("authors")}>
                {authors.map((auth) => <option>{auth.name}</option>)}
            </select>
            <input type="submit"/>
        </form>
    );
};

export default CreateBook;