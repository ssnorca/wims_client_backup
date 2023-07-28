import Cookies from 'js-cookie';
import axios from 'axios';
const accessToken = Cookies.get('XSRF-TOKEN')
const authAxios = axios.create({
      baseURL:'http://localhost:8000',
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })

export default authAxios
