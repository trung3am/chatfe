export const process = (encrypt, text, cypher) => {
  return {
    type: "PROCESS",
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};

export const updateUser = (user) => { 
  return{
    type: "USER",
    user
  }
}

export const updateCurrentRoom = (roomname) => {
  return {
    type: "CURRENT_ROOM",
    roomname
  }
}
