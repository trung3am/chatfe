const initialState = {
    user: {
        name: null
    },
    token: null
}
export const userReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "USER":
        return {...state,
        user: action.user};
        case "UPDATE_TOKEN":
        return {
            ...state,
            token: action.token
        }
        default:
            
            return state;
    }
    
}