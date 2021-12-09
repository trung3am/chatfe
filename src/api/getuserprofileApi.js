const axios = require('axios');

const GetUserProfileApi = async (token) => {

    
      
      var config = {
        method: 'get',
        url: 'http://localhost:3005/users/me',
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

export default GetUserProfileApi;