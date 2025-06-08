import apiAction from '../Actions/apiAction';

const apiDispatcher = {
    dispatch(action){
        switch(action.type){
            case 'REGISTER':
                return apiAction.register(action.payload);
            case 'LOGIN':
                return apiAction.login(action.payload);
            case 'SIGNUP':
                return apiAction.signup(action.payload);
            default:
                return Promise.reject("Unknown action");
        }
    }
};

export default apiDispatcher;