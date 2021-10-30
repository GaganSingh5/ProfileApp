import React, { Component, SyntheticEvent } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import UserService from './UserService';


interface UserModel {
  image: Object | string;
  name: string;

}

export class User extends Component {
  state = {
    user_id: "123",
    image: null,
    imageUrl: "https://i.ibb.co/WtWHzmc/avatar.jpg",
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  };

  constructor(props: any) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUserNameChange(value: string) {
    this.setState({ username: value });
  }

  onFirstNameChange(value: string) {
    this.setState({ first_name: value });
  }

  onLastNameChange(value: string) {
    this.setState({ last_name: value });
  }

  onPhoneNumberChange(value: string) {
    this.setState({ phone_number: value });
  }

  onEmailChange(value: string) {
    this.setState({ email: value });
  }
  selectFile = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true
    });
    console.log(result);

    if (!result["cancelled"]) {
      console.log("done");
      // const imageFile = new File(
      //   [result["uri"]],
      //   "userImage.jpeg",
      //   result["uri"]
      // );
      // console.log("data", imageFile);
      // const blob = await new Promise((resolve, reject) => {
      //   const xhr = new XMLHttpRequest();
      //   xhr.onload = function () {
      //     resolve(xhr.response);
      //   };
      //   xhr.onerror = function (e) {
      //     console.log(e);
      //     reject(new TypeError("Network request failed"));
      //   };
      //   xhr.responseType = "blob";
      //   xhr.open("GET", result["uri"], true);
      //   xhr.send(null);
      // });
      // console.log(blob);

      // const userService = new UserService();

      // userService.getImageFromPhone(result["uri"])
      // .then(res=>{
      //   console.log(res);
      // }).catch(err=>{
      //   console.log(err);
      // })
      
      
      
      this.setState({ image: result, imageUrl: result["uri"] });
    }
  };

  async onSubmit() {
    console.log(this.state);
    const userData = {
      user_id: "123",
      image: this.state.image,
      username: "dasd",
      first_name: "dasdas",
      last_name: "asdasd",
      phone_number: "dasd",
      email: "asdasd",
    };

    // const formData = new FormData();

    // let localUri:string = this.state.imageUrl;
    // let filename: string = localUri.split("/")[0];

    // // Infer the type of the image
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;

    // // Upload the image using the fetch and FormData APIs
    // // let formData = new FormData();
    // // Assume "photo" is the name of the form field the server expects
    // const blob = { uri: localUri, name: filename, type };
    // formData.append("image", blob:Blob);
    
    const userService = new UserService();
    // // const data = new FormData()
    userService
      .setUserProfile(userData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={userStyles.body}>
        <View style={userStyles.header_text_container}>
          <Text style={userStyles.header_text}>TELL US ABOUT YOURSELF</Text>
        </View>
        <View style={userStyles.header_conatiner}>
          <View style={userStyles.headerContent}>
            <Image
              style={userStyles.avatar}
              source={{
                uri: this.state.imageUrl,
              }}
            />
            <TouchableOpacity
              onPress={this.selectFile}
              style={userStyles.addBtn}
            >
              <Image
                style={userStyles.add}
                source={{
                  uri: "https://img.icons8.com/cotton/48/000000/add--v2.png",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={userStyles.input__container}>
          <View style={userStyles.item}>
            <TextInput
              style={userStyles.input}
              onChangeText={this.onUserNameChange}
              value={this.state.username}
              placeholder="Unique Name"
              placeholderTextColor={"#E9A6A6"}
            />
          </View>

          <View style={userStyles.item}>
            <TextInput
              style={userStyles.input}
              onChangeText={this.onFirstNameChange}
              value={this.state.first_name}
              placeholder="First Name"
              placeholderTextColor={"#E9A6A6"}
            />
          </View>

          <View style={userStyles.item}>
            <TextInput
              style={userStyles.input}
              onChangeText={this.onLastNameChange}
              value={this.state.last_name}
              placeholder="Last Name"
              placeholderTextColor={"#E9A6A6"}
            />
          </View>

          <View style={userStyles.item}>
            <TextInput
              style={userStyles.input}
              onChangeText={this.onPhoneNumberChange}
              value={this.state.phone_number}
              placeholder="Phone Number"
              placeholderTextColor={"#E9A6A6"}
            />
          </View>

          <View style={userStyles.item}>
            <TextInput
              style={userStyles.input}
              onChangeText={this.onEmailChange}
              value={this.state.email}
              placeholder="Email"
              placeholderTextColor={"#E9A6A6"}
            />
          </View>
        </View>
        <View style={userStyles.btn__container}>
          <TouchableOpacity
            onPress={this.onSubmit}
            style={userStyles.submitBtn}
          >
            <Text style={userStyles.submit__text}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const userStyles = StyleSheet.create({
  body: {
    // alignItems: "center",
    // justifyContent: "center",
    minHeight: "100%",
    width: '100%',
    // borderWidth: 2,
    // borderColor: "green",
    backgroundColor: "#1F1D36",
  },
  header_text_container: {
    paddingHorizontal: 20,
    marginTop: 50,
    // borderColor: "pink",
    // borderWidth: 2,
    alignItems: "center",
    color: "#E9A6A6",
  },
  header_text: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 20,
    color: "#E9A6A6",
  },
  header_conatiner: {
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 50,
    // borderColor: "pink",
    // borderWidth: 2,
  },
  headerContent: {
    // borderColor: "white",
    // borderWidth: 2,
    padding: 30,
    alignItems: "center",
    margin: 10,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#E9A6A6",
    marginBottom: 10,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    position: "absolute",
    bottom: 30,
    left: "60%",
  },
  add: {
    width: 40,
    height: 40,
  },
  input__container: {
    // borderColor: "yellow",
    // borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  input: {
    flex: 1,
    height: 60,
    margin: 10,
    marginHorizontal: 40,
    borderWidth: 3,
    borderRadius: 100,
    paddingHorizontal: 30,
    color: "#E9A6A6",
    borderColor: "#E9A6A6",
    fontSize: 20,
  },
  btn__container: {
    // borderColor: "yellow",
    // borderWidth: 2,
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: "#864879",
    flex: 1,
    marginTop: 20,
    marginHorizontal: 40,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  submit__text: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1D36",
  },

  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 25,
    color: "#778899",
    fontWeight: "600",
  },
  // body: {
  //   backgroundColor: "#293241",
  //   // height: 500,
  //   alignItems: "center",
  // },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
});

export default User


