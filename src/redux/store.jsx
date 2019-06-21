import Authreducer from './reducers/AuthReducer'
import ClassroomReducer from './reducers/ClassroomReducer'

import { createStore , applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk'; //thunk helps to add middle ware to action creators with the help of applyMiddle from redux above


const composeEnhancers = process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth : Authreducer,
    classroom:ClassroomReducer
})

const store =  createStore(rootReducer ,composeEnhancers(
    applyMiddleware(thunk)
));

export default store;