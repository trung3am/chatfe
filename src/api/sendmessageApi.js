const axios = require('axios');

const SendMessageApi = async (username,ans, roomname, avaurl) => {
    var data = JSON.stringify({
        username: username,
        text: ans,
        roomname: roomname,
        avaurl: avaurl
    })
    
    
      
      var config = {
        method: 'post',
        url: 'http://localhost:3005/messages/send',
        headers: { 
            'Content-Type': 'application/json'
          },
          data : data
      };
      
      try {
        const res = await axios(config)
        console.log(res)
        return res.data;
      } catch (e) {
          console.log(e)
          return e
      }

}

export default SendMessageApi;