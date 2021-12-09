const axios = require('axios');

const LogOutApi = async (token) => {

      
      var config = {
        method: 'post',
        url: 'http://localhost:3005/users/logout',
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

export default LogOutApi;