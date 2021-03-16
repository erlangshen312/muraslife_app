// import React, {useState} from 'react';
// import {getAuthData} from '../utils/asyncStorage';
// import {Linking, Modal} from 'react-native';
// import {WebView} from 'react-native-webview';

// export default metroWebView = async ({code}) => {
//   const [isWebViewModal, setIsWebViewModal] = useState(false);
//   const authData = await getAuthData();
//   const url = `https://yandex.ru/metro/moscow?route_from_id=${authData.code}&route_to_id=${code}`;
//   // setIsWebViewModal(true)
//   //   Linking.canOpenURL(url)
//   //     .then((supported) => {
//   //       if (!supported) {
//   //         console.log("Can't handle url: " + url);
//   //       } else {
//   //         return Linking.openURL(url);
//   //       }
//   //     })
//   //     .catch((err) => console.error('An error occurred', err));

//   const onNavigationStateChange = (navState) => {
//     if (navState.url.indexOf('https://www.google.com') === 0) {
//       const regex = /#access_token=(.+)/;
//       let accessToken = navState.url.match(regex)[1];
//       console.log(accessToken);
//     }
//   };

//   useEffect(() => {
//     setIsWebViewModal(true);
//   }, []);
//   return (
//     <Modal
//       animationType="fade"
//       transparent={false}
//       visible={isWebViewModal}
//       onRequestClose={() => setIsWebViewModal()}
//       style={{height: 350, width: 300}}>
//       <WebView
//         source={{uri: url}}
//         onNavigationStateChange={onNavigationStateChange}
//         startInLoadingState
//         scalesPageToFit
//         javaScriptEnabled
//         style={{flex: 1, marginTop: 30}}
//       />
//     </Modal>
//   );
// };

// <View style={styles.card_header}>
//                 <Text style={styles.card_header_title} numberOfLines={1}>
//                   {item.title}{' '}
//                 </Text>
//                 <Text style={styles.card_header_cost}>
//                   {item.cost && item.cost + ' ' + globalConfig.RUB}
//                 </Text>
//               </View>
//               <View style={styles.card_body}>
//                 <Text
//                   style={styles.card_body_note}
//                   numberOfLines={3}
//                   ellipsizeMode="tail">
//                   {item.note}
//                 </Text>
//                 {type === 'profile' && (
//                   <View style={{marginBottom: 10}}>
//                     <Text style={{color: mlColors.note}}>{item.date}</Text>
//                     <Text style={{color: mlColors.note}}>{item.timer}</Text>
//                   </View>
//                 )}
//                 <TouchableOpacity
//                   style={styles.card_body_metro}
//                   onPress={() => _handleWeb(item.code)}>
//                   <View
//                     style={[
//                       {backgroundColor: `${item.color}`},
//                       styles.card_body_metro_icon,
//                     ]}>
//                     <Text>{item.number}</Text>
//                   </View>
//                   <Text style={styles.card_body_metro_title}>
//                     {item._metro}
//                   </Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity
//                   style={styles.card_body_metro}
//                   onPress={() => metro(item.code)}>
//                   <View
//                     style={[
//                       {backgroundColor: `${item.color}`},
//                       styles.card_body_metro_icon,
//                     ]}>
//                     <Text>{item.number}</Text>
//                   </View>
//                   <Text>{item._metro}</Text>
//                 </TouchableOpacity> */}
//                 <TouchableOpacity
//                   style={styles.card_body_address}
//                   onPress={() => location(item.adress)}>
//                   <Icon
//                     name="location"
//                     size={24}
//                     style={styles.card_body_address_icon}
//                   />
//                   <Text
//                     numberOfLines={1}
//                     ellipsizeMode="tail"
//                     style={styles.card_body_address_title}>
//                     {item.adress}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.card_footer}>
//                 <TouchableOpacity style={styles.card_footer_info}>
//                   <Image
//                     style={styles.card_footer_info_avatar}
//                     source={
//                       item.avatar
//                         ? {uri: apiUrl + '/' + item.avatar}
//                         : USER_LOGO
//                     }
//                   />
//                   <Text style={styles.card_footer_info_name}>{item.name}</Text>
//                 </TouchableOpacity>
//                 <View style={{flexDirection: 'row'}}>
//                   <TouchableOpacity style={styles.card_footer_like}>
//                     <Icon name="heart-outline" size={20} />
//                     <Text>39</Text>
//                   </TouchableOpacity>
//                   <View style={styles.card_footer_watch}>
//                     <Icon name="eye-outline" size={20} />
//                     <Text>2467</Text>
//                   </View>
//                 </View>
//               </View>

///IMAGE PICKER


