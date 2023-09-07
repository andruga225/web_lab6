import axios from "axios";
import qs from "qs"

export default class Service{
    static async getUnreadBooks(lang=''){

        const response = lang==='' ?
            await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books/unread')
                :
            await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books/unread', {
            params:{
                lang: lang
            }
        })

        return response
    }

    static async getBooks(lang = '', is_readied = '', author = '')
    {
        let response
        if(lang === '' && author === '')
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books', {
                params:{
                    is_readied: is_readied
                }
            })
        if(lang === '' && author != '')
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books', {
                params:{
                    is_readied: is_readied,
                    author: author
                }
            })
        if(lang != '' && author === '')
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books', {
                params:{
                    is_readied: is_readied,
                    lang: lang
                }
            })
        if(lang != '' && author != '')
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/books', {
                params:{
                    is_readied: is_readied,
                    lang: lang,
                    author: author
                }
            })
        return response
    }

    static async getLanguages(){
        const response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/languages')
        return response
    }

    static async getAllAuthors(){
        const response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/authors')
        return response
    }

    static async deleteBook(id){
        const response = await axios.delete('http://127.0.0.1:5000/api/v1/dictionary/books/'+id)
        return response
    }

    static async deleteAuthor(id){
        const response = await axios.delete('http://127.0.0.1:5000/api/v1/dictionary/authors/'+id)
        return response
    }

    static async postBook(data){
        const headers = {
            'Access-Control-Allow-Origin': '*'
        }
        const response = await axios.post('http://127.0.0.1:5000/api/v1/dictionary/books?' + qs.stringify(data, {indices: false}), headers)
        return response
    }

    static async putBook(id, data){
        const obj = Object.fromEntries(Object.entries(data).filter(([k, v]) => v))
        const response = await axios.put('http://127.0.0.1:5000/api/v1/dictionary/book/'+id+'?' + qs.stringify(obj,
            {indices: false,
                    skipNulls:true,
                    }))
        return response
    }

    static async getAuthors(name = '', lang = ''){
        let response
        if(name === '' && lang === ''){
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/authors')
            console.log("Service")
        }

        if(name != '' && lang === ''){
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/author', {
                params:{
                    author: name
                }
            })
        }

        if(name === '' && lang != ''){
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/author', {
                params:{
                    lang: lang
                }
            })
        }

        if(name != '' && lang != ''){
            response = await axios.get('http://127.0.0.1:5000/api/v1/dictionary/author', {
                params:{
                    author: name,
                    lang: lang
                }
            })
        }
        return response
    }

    static async postAuthor(data){
        const headers = {
            'Access-Control-Allow-Origin': '*'
        }
        const response = await axios.post('http://127.0.0.1:5000/api/v1/dictionary/authors?' + qs.stringify(data, {indices: false}), headers)
        return response
    }

    static async putAuthor(id, data){
        const obj = Object.fromEntries(Object.entries(data).filter(([k, v]) => v))
        const response = await axios.put('http://127.0.0.1:5000/api/v1/dictionary/authors/'+id+'?' + qs.stringify(obj,
            {indices: false,
                skipNulls:true,
            }))
        return response
    }
}