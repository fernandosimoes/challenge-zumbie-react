import * as actiontypes from '../actiontypes'
const initialState = {

}

const people = (state = initialState, action) => {
  switch (action.type) {
    case actiontypes.ADD_PEOPLE_SUCCESS:
      console.log(action);
    case actiontypes.GET_PEOPLE_SUCCESS:
      console.log(action);
    default:
      return state
  }
}

export default people;