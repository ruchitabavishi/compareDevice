import axios from 'axios'

const baseURL = 'http://www.mocky.io'

export default axios.create({
    baseURL
})