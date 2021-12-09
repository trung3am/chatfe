const axios = require('axios');

const UpLoadPictureApi = async (file,token) => {
    const data = new FormData()
    console.log(file[0])
    data.append('picture', file[0]);
    data.append('name', file[0].name);
      
      var config = {
        method: 'post',
        url: 'http://localhost:3005/users/picture/create',
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

export default UpLoadPictureApi;