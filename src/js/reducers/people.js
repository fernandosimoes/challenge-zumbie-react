import * as actiontypes from '../actiontypes'
const initialState = {
  people: []
}

const people = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.ADD_PEOPLE_SUCCESS:
      console.log(action);
      // mostrar mensagem de sucesso quando adicionado com sucesso, atualizar a tabela
    case actiontypes.GET_PEOPLE_SUCCESS:
      return {...state, people: action.payload}
    case actiontypes.UPDATE_PEOPLE_SUCCESS:
      console.log(action);
      // update the local state people na position do action payload para receber as novas infoações, mostras mensagem de atualizado com sucesso receber state na list
      return { 
        ...state, 
        contents: state.contents.map( (content, i) => i === 1 ? {...content, text: action.payload} : content )
      }
      return {...state, people: action.payload}
    case actiontypes.REPORT_INFECTED_PEOPLE_SUCCESS:
      console.log(action);
      return {...state, people: action.payload}
    default:
      return state
  }
}

export default people;