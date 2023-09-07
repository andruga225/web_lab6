import React, {useEffect, useState} from 'react';
import cl from './CreateBook.module.css'
import {useForm} from 'react-hook-form'
import Service from "../../API/Service";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import qs from 'qs'
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";
//import {useLocalStorage} from '../../Hooks/useLocalStorage'

function getStorageValue(key, defaultValue) {
    // getting stored value
    const saved = localStorage.getItem(key);
    const initial = qs.parse(saved);
    console.log(initial);
    console.log(defaultValue);
    return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // storing input name
        localStorage.setItem(key, qs.stringify(value));

    });

    return [value, setValue];
};



const CreateBook = ({languages, authors, sentRequest, is_create, update, bookToChange}) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [language, setLanguage] = useState()
    const [readied, setReadied] = useState()
    const [author, setAuthor] = useState()
    const [schema, setSchema] = useState()

    useEffect(() => {
        if(is_create){
            console.log("schema is now")
            console.log({is_create})
            setSchema(yup.object().shape({
                name: yup.string().required("Не указано название книги"),
                year: yup.number("Год написания должен быть целочисленным")
                    .positive("Год написания должен быть положительным")
                    .integer("Год написания должен иметь целочисленное значение")
                    .required("Не указан год написания книги")
                    .typeError("Не указан год написания книги"),
                lang: yup.string().required("Язык не указан"),
                is_readied: yup.boolean().required("Не указано, прочитана ли книга"),
                authors: yup.array(yup.string()).min(1, "Не указаны авторы книги").required("Не указаны авторы книги")
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
        //reset()
    }, [is_create])

    const [value, setValue] = useLocalStorage("book",
        {
            "name": '',
            "year": '',
        })

    async function addValue(data){
        toast.dismiss()
        console.log("Hello")
        try {
            schema.validateSync(data, {abortEarly: false})
            if(is_create) {
                const response = await Service.postBook(data)
                //console.log(data)
            }else{
                const response = await Service.putBook(bookToChange, data)
                console.log(response.request)
            }
            sentRequest()
            update()
            localStorage.clear()
            //reset()
        }
        catch(err){
            err.errors.forEach(e => {toast.error(e)})
        }
    }

    return (
        <form onSubmit={handleSubmit(addValue)}>
            <input  defaultValue={value["name"]}
                    {...register("name")}
                    placeholder={"Название книги"}
                    onChange={e => {
                        const val = value;
                        val["name"] = e.target.value;
                        setValue(val);
                    }}/>

            <input  defaultValue={value["year"]}
                    {...register("year")}
                   placeholder={"Год написания"}
                   onChange={e => {
                       const val = value;
                       val["year"] = e.target.value;
                       setValue(val);
                       console.log(val)
                       //console.log(value);
                   }}
            />
            <label className={cl.label}>Язык книги</label>
            <select
                    value={language}
                    onChange={e =>{
                            setLanguage(e.target.value)
                             }}
                    {...register("lang")}>
                {languages.map((lang) => <option>{lang.name}</option>)}
            </select>
            <label className={cl.label}>Книга прочитана?</label>
            <select  value={readied}
                    onChange={e => {
                            setReadied(e.target.value)
                    }}
                    {...register("is_readied")}> :
                <option value={true}>Да</option>
                <option value={false}>Нет</option>
            </select>
            <select
                    className={cl.select}
                    multiple={true}
                    value={author}
                    onChange={e =>{
                            setAuthor(e.target.value)
                            console.log(value);
                    }}
                    {...register("authors")}>
                {authors.map((auth) => <option>{auth.name}</option>)}
            </select>
            <input type="submit"/>
            <ToastContainer/>
        </form>
    );
};

export default CreateBook;