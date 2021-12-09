const axios = require('axios');

const LoginApi = async (email, password) => {

    var data = JSON.stringify({
        email: email,
        
        password: password
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:3005/users/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
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

export default LoginApi;