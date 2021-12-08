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
    payload: {
      user
    }
  }
}