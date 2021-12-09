const axios = require('axios');

const DeleteAllPictureApi = async (token) => {
    
      
      var config = {
        method: 'delete',
        url: 'http://localhost:3005/users/picture/delete/all',
        headers: { 
          Authorization: "Bearer " + token
        },


      };
      
      try {
        const res = await axios(config)
        console.log(res)
        return res;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default DeleteAllPictureApi;