const initialState = {
    user: {
        name: null,
        pictures: []
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
        case "LOGOUT":
            return{
                user: {
                    name: null,
                    pictures: []
                },
                token: null

            }

        default:
            
            return state;
    }
    
}