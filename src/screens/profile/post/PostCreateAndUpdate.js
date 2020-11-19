import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {apiUrl, dimensionWidth, mlColors} from '../../../configs/config';
import {getToken, getAuthData} from '../../../utils/asyncStorage';

export default function PostCreateAndUpdate() {
  const [warning, setWarning] = useState('');
  const [selectedItem, setSelectedItem] = useState({});

  const config = {
    headers: {
      'Content-Type': 'application/json',
      // 'x-auth-token': token
    },
  };

  const [form, setForm] = useState({
    _id: '',
    title: '',
    note: '',
    adress: '',
    cost: '',
    category: '',
    metro: '5ebd0bb856e90d78cbe0792c',
    phone: '',
    banner: '',
  });

  const [metros, setMetros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl + '/api/metro', config);
        setMetros(res.data);
        console.log(res.data);
      } catch (err) {
        console.warn(err);
      }
    };
    fetchData();
  }, []);

  const {title, note, adress, cost, category, metro, phone, banner} = form;

  // useEffect(() => {
  //   checkStoreData();
  //   return () => {};
  // }, []);

  // const checkStoreData = async () => {
  //   const authData = await getAuthData();
  //   setForm({
  //     _id: authData._id,
  //     title: authData.title,
  //     note: authData.note,
  //     adress: authData.adress,
  //     cost: authData.cost,
  //     phone: authData.phone,
  //     category: authData.category,
  //     metro: authData.metro,
  //     banner: authData.banner,
  //   });
  // };

  const createPost = async () => {
    const token = await getToken();
    let formData = {
      _id: form._id,
      title: form.title,
      note: form.note,
      adress: form.adress,
      cost: form.cost,
      phone: form.phone,
      category: form.category,
      metro: form.metro,
      banner: form.banner,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    try {
      console.log(formData);
      const res = await axios.post(apiUrl + '/api/post/add', formData, config);
      console.log(res.data);
      setAuthData(res.data);
      exitModalInfo();
    } catch (error) {
      const warning = error.response.data.errors.map((er) => er.msg);
      setWarning(warning);
      console.log('in catch error: ', warning);
    }
  };

  const _handlerClose = () => {
    exitModalInfo();
    checkStoreData();
    setWarning('');
    //REFRESH AUTHDATA TO SHOW NEW INFORMATION
  };

  _handleSelected = (selected) => {
    setSelectedItem(selected);
  };

  return (
    <View style={styles.modalContainer}>
      <ScrollView>
        <View>
          <View style={styles.input_container}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              style={styles.text_input}
              placeholder="Enter the title"
              value={title}
              onChangeText={(text) => setForm({...form, title: text})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              style={[
                styles.text_input,
                {
                  paddingTop: 20,
                  padding: 15,
                  height: 200,
                },
              ]}
              multiline={true}
              numberOfLines={12}
              placeholder="Enter the note"
              value={note}
              onChangeText={(text) => setForm({...form, note: text})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="Enter the cost"
              value={cost}
              onChangeText={(text) => setForm({...form, cost: text})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              style={styles.text_input}
              placeholder="Enter the adress"
              value={adress}
              onChangeText={(text) => setForm({...form, adress: text})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="+7XXXZZZOORR"
              value={phone}
              onChangeText={(text) => setForm({...form, phone: text})}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="+7XXXZZZOORR"
              value={phone}
              onChangeText={(text) => setForm({...form, phone: text})}
            />
            
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity
              title="Login"
              style={[styles.save_button]}
              onPress={() => updateInfo()}>
              <Text style={styles.save_text_button}>Обновить</Text>
            </TouchableOpacity>
            {warning.length > 0 ? (
              <Text style={styles.error}>{warning}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  image_container: {
    // flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  image_avatar_block: {
    marginRight: 10,
    height: 100,
    width: 100,
    borderRadius: 5,
  },
  image_banner_block: {
    height: 100,
    width: dimensionWidth * 0.6,
    borderRadius: 5,
  },
  input_container: {
    flexGrow: 1,
  },
  button_container: {
    // flexGrow: 1,
    paddingTop: 10,
  },
  text_input: {
    height: 55,
    backgroundColor: 'rgba(236,239,241 ,1)',
    marginBottom: 15,
    paddingLeft: 20,
    borderRadius: 10,
  },
  save_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.light_green,
    height: 55,
    marginBottom: 20,
    borderRadius: 30,
  },
  save_text_button: {
    color: mlColors.black,
    fontWeight: '700',
  },
  exit_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.white,
    height: 55,
    marginBottom: 20,
    borderRadius: 30,
  },
  exit_text_button: {
    color: mlColors.dark_blue,
    fontWeight: '700',
  },
  error: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    color: mlColors.light_red,
  },
});
