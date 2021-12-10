const initialState = {
    user: {
        name: null,
        pictures: []
    },
    token: null,
    isReloaded: false
}
export const userReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "USER":
        return {...state,
        user: action.user,
        isReloaded: true
    };
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

        case "SET_RELOAD":
            return {
                ...state,
                isReloaded: false
            }

        default:
            
            return state;
    }
    
}