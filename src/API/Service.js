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

    static async postBook(data){
        const headers = {
            'Access-Control-Allow-Origin': '*'
        }
        const response = await axios.post('http://127.0.0.1:5000/api/v1/dictionary/books?' + qs.stringify(data, {indices: false}), headers)
        return response
    }

    static async putBook(id, data){
        const response = await axios.put('http://127.0.0.1:5000/api/v1/dictionary/book/'+id+'?' + qs.stringify(data, {indices: false}))
        return response
    }
}