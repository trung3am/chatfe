const initialState = {
    user: null
}
export const userReducer = (state = initialState ,action) => {
    switch (action.type) {
        case "USER":
        return {...state,
        user: action.user};
        default:
            
            return state;
    }
}