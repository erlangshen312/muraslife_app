// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Modal,
//   TouchableOpacity,
// } from 'react-native';
// import {dimensionWidth, mlColors} from '../../configs/config';

// export default function ProfileCreatePostModal({
//   modalVisible,
//   setModalVisible,
// }) {
//   const [formData, setFormData] = useState({
//     title: '',
//     note: '',
//     banner: '',
//     adress: '',
//     metro: '',
//     cost: Number,
//     category: '',
//     sub_category: '',
//     service: '',
//     phone: '',
//   });

//   const {
//     title,
//     note,
//     banner,
//     metro,
//     phone,
//     adress,
//     cost,
//     category,
//     sub_category,
//     service,
//   } = formData;

//   const onChangeHandler = (e) => {
//     console.log(e.target.name);
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const saveData = () => {
//     const a = formData;
//     console.log(a);
//   };

//   console.log(formData);
//   return (
//     <Modal
//       animationType="fade"
//       transparent={false}
//       visible={modalVisible}
//       onRequestClose={() => this.modalVisible}>
//       <View style={styles.modalContainer}>
//         <Text
//           style={{
//             fontSize: 30,
//             fontWeight: '800',
//             width: dimensionWidth / 2,
//             marginBottom: 40,
//           }}>
//           Создай объявление
//         </Text>
//         <View style={styles.input_container}>
//           {/* <Text style={styles.error}>{warning}</Text> */}
//           <TextInput
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType={'default'}
//             style={styles.text_input}
//             placeholder="Enter the title"
//             name="title"
//             onChangeText={(text) => onChangeHandler({title: text})}
//           />
//           <TextInput
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType={'default'}
//             style={styles.text_input}
//             multiline={true}
//             numberOfLines={12}
//             placeholder="Enter the note"
//             value={note}
//             onChangeText={(text) => setFormData({...formData, note: text})}
//           />
//           <TextInput
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType={'phone-pad'}
//             style={styles.text_input}
//             placeholder="Enter the cost"
//             value={cost}
//             onChangeText={(text) => setFormData({...formData, cost: text})}
//           />
//           <TextInput
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType={'default'}
//             style={styles.text_input}
//             placeholder="Enter the adress"
//             value={adress}
//             onChangeText={(text) => setFormData({...formData, adress: text})}
//           />
//           <TextInput
//             autoCapitalize="none"
//             autoCorrect={false}
//             keyboardType={'phone-pad'}
//             style={styles.text_input}
//             placeholder="+7XXXZZZOORR"
//             value={phone}
//             onChangeText={(text) => setFormData({...formData, phone: text})}
//           />
//         </View>
//         <View style={styles.button_container}>
//           <TouchableOpacity
//             title="Login"
//             style={styles.button}
//             onPress={() => saveData()}>
//             <Text style={styles.text_button}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             title="Login"
//             style={styles.button}
//             onPress={() => setModalVisible()}>
//             <Text style={styles.text_button}>Exit</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     // textAlign: 'center',
//     justifyContent: 'center',
//     alignContent: 'center',
//     padding: 20,
//   },
//   text_input: {
//     height: 55,
//     backgroundColor: 'rgba(236,239,241 ,1)',
//     marginBottom: 15,
//     paddingLeft: 20,
//     borderRadius: 30,
//   },
//   button: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: mlColors.light_blue,
//     height: 55,
//     marginBottom: 20,
//     borderRadius: 30,
//   },
//   text_button: {
//     color: mlColors.black,
//     fontWeight: '700',
//   },
//   error: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     marginLeft: 5,
//     color: mlColors.white,
//   },
// });
