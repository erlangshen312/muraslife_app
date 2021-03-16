import React, {useState} from 'react';
import {getAuthData} from '../utils/asyncStorage';
import findModal from './findModal';
import {Linking, Modal} from 'react-native';
import {WebView} from 'react-native-webview';

export const metro = async (code) => {
  // const [isWebViewModal, setIsWebViewModal] = useState(false);

  const authData = await getAuthData();
  const url = `https://yandex.ru/metro/moscow?route_from_id=${authData.code}&route_to_id=${code}`;
  // setIsWebViewModal(true)
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));

  // let onNavigationStateChange = navState => {
  //     if (navState.url.indexOf('https://www.google.com') === 0) {
  //         const regex = /#access_token=(.+)/;
  //         let accessToken = navState.url.match(regex)[1];
  //         console.log(accessToken);
  //     }
  // };
  // return (
  //     <Modal
  //         animationType="fade"
  //         transparent={false}
  //         visible={isWebViewModal}
  //         onRequestClose={() => setIsWebViewModal()}
  //         style = {{ height: 350, width: 300 }}>
  //         <WebView
  //             source = {{ uri: url}}
  //             onNavigationStateChange={this.onNavigationStateChange}
  //             startInLoadingState
  //             scalesPageToFit
  //             javaScriptEnabled
  //             style={{ flex: 1, marginTop: 30 }}
  //         />
  //     </Modal>
  // )

  // return(
  //     <findModal isWebViewModal={isWebViewModal} setIsWebViewModal={()=>setIsWebViewModal(false)} url={url} />
  // )
};

export const location = (address) => {
  // const authData = await getAuthData()
  console.log('ADDREESSSS:', address);
  const url = `https://2gis.ru/moscow/search/${address}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('An error occurred', err));
};
