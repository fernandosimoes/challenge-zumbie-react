import * as actiontypes from '../actiontypes';


import { get, add } from '../resources/people'

export const getPeople = () => {
  return (dispacth) => {
    get().then(peoples => {
      dispacth({ type: actiontypes.GET_PEOPLE_SUCCESS, payload: peoples.data })
      // peoples.json().then(jsonpeople => {
      // })
    })
  }
}
export const addPeople = (formcontent) => {
  return (dispacth) => {
    add(formcontent).then(success => {
      console.log('success', success)
      dispacth({ type: actiontypes.ADD_PEOPLE_SUCCESS, payload: peoples.data })
    }).catch(error => {
      console.log('error', error)
    })
  }
}