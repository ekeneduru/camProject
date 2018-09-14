/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,
   View,Button,Image,ScrollView,
   CameraRoll,
   TouchableHighlight,
   PermissionsAndroid,
   
  
  } from 'react-native';
  import RNFetchBlob from 'rn-fetch-blob'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      photos:[],
    };
    
  }
  componentWillMount() {
    
    this.requestCameraPermission();
    this._handleButtonPress();

  }

    requestCameraPermission= async ()=> {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
        
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  

  render() {
    return (
      <View style={{ flex: 1 }}>
        
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.state.photos.map((p, i) => {
          return (
            <TouchableHighlight key={i} onPress={()=>this.handleImagePress(i)}>
            <Image
              key={i}
              style={{
                width: 105,
              height: 120,
               marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#979797'
              }}
              source={{ uri: p.node.image.uri }}
              onPress={()=>this.handleImagePress}
            />
           </TouchableHighlight>
          );
        })}
        </ScrollView>
        {/* <Button block large style={styles.appbutton} title="Load Images" onPress={this._handleButtonPress} /> */}
      </View>
    );
   }
  
   handleImagePress=(i)=>{
    alert(i)
    const image=this.state.photos[i].node.image.uri;
      
     RNFetchBlob.fs.readFile(image,'base64')
     .then((data)=>{
        alert(`data:image/jpg;${data}`)
     })
     
    
   }

   _handleButtonPress = () => {
    
    CameraRoll.getPhotos({
      first: 20000,
     // groupTypes: 'All',
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        alert(JSON.stringify(err))
        //Error Loading Images
      });
    };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  appbutton:{
    margin:10, 
    marginTop:50,
    height:150,
    backgroundColor: "#0c4e10" },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scrollView:{
  flexWrap: 'wrap',
  flexDirection: 'row',
  }
});
