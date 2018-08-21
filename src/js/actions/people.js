import * as actiontypes from '../actiontypes';


import { get, add, updatelocation } from '../resources/people'

export const getPeople = () => {
  console.log('aqui')
  return (dispacth) => {
    get().then(peoples => {
      console.log('retorno', peoples)
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
      dispacth({ type: actiontypes.ADD_PEOPLE_SUCCESS, payload: success.data })
    }).catch(error => {
      console.log('error', error)
    })
  }
}

export const updatePeople = (formcontent) => {
  return (dispacth) => {
    updatelocation(formcontent).then(success => {
      dispacth({ type: actiontypes.UPDATE_PEOPLE_SUCCESS, payload: success.data })
      // update a current state but just people updated will receive a new value
    }).catch(error => {
      console.log('error', error)
    })
  }
}

export const reportInfection = () => {
  return (dispacth) => {
    updatelocation(formcontent).then(success => {
      dispacth({ type: actiontypes.UPDATE_PEOPLE_SUCCESS, payload: success.data })
      dispacth(getPeople());
    }).catch(error => {
      console.log('error', error)
    })
  }
}