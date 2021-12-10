import { serverUrl } from './link';
const axios = require('axios');

const GetMessageApi = async (roomname) => {
    var data = JSON.stringify({
        roomname: roomname
    })

      
      var config = {
        method: 'post',
        url: serverUrl + "/messages",
        headers: { 
            'Content-Type': 'application/json'
          },
          data: data
      };
      
      try {
        const res = await axios(config)
        console.log(res)
        return res.data;
      } catch (e) {
          console.log(e)
          return
      }

}

export default GetMessageApi;