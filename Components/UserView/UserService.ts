import axios from "axios"


export class UserService {
  postUrl: string = "https://hacknitr-1.herokuapp.com/create_user";
  postUrl2 = "https://hacknitr-1.herokuapp.com/social_dropdown";

  setUserProfile(userData: any) {
    return axios.post(this.postUrl, userData);
  }

  getImageFromPhone(uri: string) {
    console.log(uri);

    axios.get(uri).then((res) => {
      console.log(res);
    });
  }

  getSocialData() {
    return axios.get(this.postUrl2);
  }
}


export default UserService;