import { serverUrl } from './link';
const axios = require('axios');

const SignUpApi = async (name, email, password) => {

    var data = JSON.stringify({
        email: email,
        name: name,
        password: password
      });
      
      var config = {
        method: 'post',
        url: serverUrl + "/users",
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

export default SignUpApi;