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
      console.log(action.payload)
      return { messages: action.payload };

    case "USER":
      return {user: action.payload};

    default:
      return state;
  }
};

