const initialState = {
  user: null,
  messages: {

  },
  currentRoom: "Lobby",
  roomList: null
}

export const ProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROCESS":
      
      return {...state, 
        messages: action.payload };

    case "USER":
      return {...state,
        user: action.user};
    
    case "CURRENT_ROOM":
      return{
        ...state,
        currentRoom: action.roomname
      }


    default:
      return state;

  }
};

