const baseapi = 'http://zssn-backend-example.herokuapp.com';
import axios from 'axios';

export const get = () =>{
  console.log('get api')
  return axios.get(`${baseapi}/api/people.json`)
}

export const add = ({ name, age, gender, items, lonlat }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
  const data = `person[name]=${name}&person[age]=${age}&person[gender]=${gender}&person[lonlat]=${lonlat}&items=${items}`;
  console.log(data);
  return axios.post(`${baseapi}/api/people.json`,encodeURI(data), headers)
}

export const updatelocation = ({ name, age, gender, lonlat, id }) => {
  console.log(name, age, gender, lonlat, id)
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  }
  const data = `person[name]=${name}&person[age]=${age}&person[gender]=${gender}&person[lonlat]=${lonlat}`;
  return axios.patch(`${baseapi}/api/people/${id}.json`, data, headers)
  
}



