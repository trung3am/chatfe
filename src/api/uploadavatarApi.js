import { serverUrl } from './link';
const axios = require('axios');

const UploadAvatarApi = async (file,token) => {
    const data = new FormData()
    console.log(file[0])

    data.append('avatar', file[0]);

      
      var config = {
        method: 'post',
        url: serverUrl + "/users/me/avatar",
        headers: { 
          Authorization: "Bearer " + token
        },
        data: data

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

export default UploadAvatarApi;