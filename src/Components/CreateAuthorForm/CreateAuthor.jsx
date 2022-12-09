import React, {useEffect, useRef, useState} from 'react';
import {set, useForm} from "react-hook-form";
import * as yup from "yup";
import {toast, ToastContainer} from "react-toastify";
import Service from "../../API/Service";
import cl from './CreateAuthor.module.css';
import QRCode from "qrcode";

const CreateAuthor = ({languages, sentRequest, isCreate, authorToChange, update}) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [authorLanguages, setAuthorLanguages] = useState()
    const [schema, setSchema] = useState()

    useEffect(() => {
        if(isCreate){
            setSchema(yup.object().shape({
                name: yup.string().required("Не указано имя автора"),
                birthday: yup.string().required("Не указана дата рождения автора"),
                biography: yup.string().required("Не указана биография автора"),
                languages: yup.array(yup.string()).min(1, "Не указаны языки, на которых пишет автор")
            }))
        }else{
            setSchema(yup.object().shape({
                name: yup.string(),
                birthday: yup.string(),
                biography: yup.string(),
                languages: yup.array(yup.string())
            }))
        }
        console.log({isCreate})
    }, [isCreate])

    async function addValue(data){
        toast.dismiss()

        try {
            schema.validateSync(data, {abortEarly: false})
            if (isCreate) {
                const response = await Service.postAuthor(data)
            } else {
                const response = await Service.putAuthor(authorToChange, data)
            }
            sentRequest()
            update()
            reset()
        }
        catch (err){
            err.errors.forEach(e => {toast.error(e)})
        }
    }

    return (
        <form onSubmit={handleSubmit(addValue)}>
            <input placeholder={"Имя автора"} {...register("name")}/>
            <input type={"date"} min={"0000-00-00"} max={"9999-12-12"} placeholder={"Дата рождения автора"} {...register("birthday")}/>
            <input placeholder={"Биография автора"} {...register("biography")}/>
            <label className={cl.label}>На каких языках пишет автор?</label>
            <select className={cl.select}
                    multiple={true}
                    value={authorLanguages}
                    onChange={(e) => setAuthorLanguages(e.target.value)}
                    {...register("languages")}>
                {languages.map((lang) => <option>{lang.name}</option>)}
            </select>
            <input type="submit"/>
            <ToastContainer/>
        </form>
    );
};

export default CreateAuthor;