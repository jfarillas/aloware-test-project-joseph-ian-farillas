import axios from 'axios';

const API_URL = `${process.env.MIX_API_URL}`;
 
export class APIService {

  constructor() { }

  async getData(route, id) {
    console.log(`${API_URL}/${route}`);
    let url = (typeof id === 'undefined' || id === null) 
      ? `${API_URL}/${route}`
      : `${API_URL}/${route}/${id}`;
    return await axios.get(url, { withCredentials: true });
  }

  async addData(route, payload) {
    const url = `${API_URL}/${route}`;
    console.log(payload);
    return await axios.post(url, payload, { withCredentials: true });
  }
}
