
const initialState = {
  messages: {
    text: 'init',
    encrypt: false,
    cypher: 'init'
  },
  roomUsers:[],
  currentRoom: "Lobby",
  roomList: null,
  isConnected: false,
  fromChat: false
}

export const ProcessReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROCESS":
      
      return {...state, 
        messages: action.payload };

    
    
    case "CURRENT_ROOM":
      return{
        ...state,
        currentRoom: action.roomname
      }

    case "UPDATE_ROOM_USER":
      return{
        ...state,
        roomUsers: action.users
      }

    case "CONNECTED":
      return{
        ...state,
        isConnected: true
      }

    case "SET_FROM_CHAT":
      return{
        ...state,
        fromChat: true
      }
      case "UNSET_FROM_CHAT":
        return{
          ...state,
          fromChat: false
        }
      case "LOGOUT":
        return{
          messages: {
            text: 'init',
            encrypt: false,
            cypher: 'init'
          },
          roomUsers:[],
          currentRoom: "Lobby",
          roomList: null,
          isConnected: false,
          fromChat: false
        }
    
    default:
      return state;

  }

  

};

