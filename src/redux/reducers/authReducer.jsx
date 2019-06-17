
import {
    LOGIN_UPDATE, REGISTER_UPDATE, LOGIN_USER_SUCCESS
} from '../actions/Types'
// import axios from 'axios';

const INITIAL_STATE = {
    auth: false,
    register: {
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    },

    login: {
        email: '',
        password: ''
    },
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_UPDATE:
            let login = {...state.login, [action.payload.prop]: action.payload.value};
            return { ...state,  login};

        case REGISTER_UPDATE:
            let register = {...state.register, [action.payload.prop]: action.payload.value};
            return { ...state,  register};

        case LOGIN_USER_SUCCESS: 
            storeUserData(action.payload);
            return { ...state, auth: true, token: action.payload };

        default: return state
    }
}

const storeUserData = (payload) => {
    console.log(payload, "Arrrived");
    localStorage.setItem('token', JSON.stringify(payload));
    activateAxios(payload);
}

const activateAxios = (payload) => {
    // axios.defaults.headers.common['Authorization'] = 'Bearer '+payload.token;
}

// const deleteUserData = () => {
//     localStorage.removeItem('token');
    // delete axios.defaults.headers.common['Authorization'];
// }