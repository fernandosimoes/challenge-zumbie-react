import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import people from './people';

export default function configureStore(preloadedState) {
    return createStore(
        people,
        applyMiddleware(
            thunkMiddleware
        )
    )
}
// this way we can acess the store where was necessary
//  store = configureStore();