import React, { Component } from 'react';
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
  Modal,
  Alert
} from "react-native";
import UserService from '../UserView/UserService';
import DropDownPicker from "react-native-dropdown-picker";

export class Links extends Component {
  state = {
    modalVisible: false,
    open: false,
    value: null,
    items: [
      {
        label: "Apple",
        value: "apple",
        url: () => (
          <Image
            source={require("../../assets/add.png")}
            style={linkStyles.urlStyle}
          />
        ),
      },
      { label: "Banana", value: "banana" },
    ],
  };

  constructor(props: any) {
    super(props);

    this.addLink = this.addLink.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setState = this.setState.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount() {
    const us = new UserService();
    us.getSocialData().then(data=>{
      console.log(data["data"]["data"]);
      // const
    })
  }

  addLink = () => {
    console.log("working");
  };
  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };

  setOpen = (open: any) => {
    this.setState({ open });
  };
  setValue(callback: any) {
    this.setState((state: any) => ({
      value: callback(state.value),
    }));
  }
  setItems = (callback: any) => {
    this.setState((state: any) => ({
      items: callback(state.items),
    }));
  };
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={linkStyles.body}>
        <Modal
          style={linkStyles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={linkStyles.centeredView}>
            <View style={linkStyles.modalView}>
              <DropDownPicker
                open={this.state.open}
                value={this.state.value}
                items={this.state.items}
                setOpen={this.setOpen}
                setValue={this.setValue}
                setItems={this.setItems}
              />
              <View style={linkStyles.input__container}>
                <TextInput style={linkStyles.modalText} />
              </View>
              <Pressable
                style={[linkStyles.button, linkStyles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={linkStyles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
          style={linkStyles.add__btn}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const linkStyles = StyleSheet.create({
  body: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "#1F1D36",
  },
  input__container: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "green",
  },
  modal: {
    flex: 1,
    width: 500,
    borderWidth: 2,
    borderColor: "yellow",
  },
  urlStyle: {
    width: 50,
    height: 50,
  },

  add__btn: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    width: "100%",
    height: 60,
  },
});

export default Links
