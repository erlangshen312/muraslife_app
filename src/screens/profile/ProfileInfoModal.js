import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  apiUrl,
  dimensionHeight,
  dimensionWidth,
  mlColors,
} from '../../configs/config';
import {getAuthData, getToken, removeAuthData, setAuthData} from '../../utils/asyncStorage';
import axios from 'axios';
export default function ProfileInfoModal({modalInfo, exitModalInfo}) {
  const [warning, setWarning] = useState('');

  const [form, setForm] = useState({
    _id: '',
    avatar: '',
    banner: '',
    adress: '',
    bdate: '',
    bio: '',
    company: '',
    email: '',
    metro: '5ebd0bb856e90d78cbe0792c',
    name: '',
    phone: '',
    skills: '',
    youtube: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    status: '',
  });

  const {
    _id,
    avatar,
    banner,
    adress,
    bdate,
    bio,
    company,
    email,
    metro,
    name,
    phone,
    skills,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook,
    whatsapp,
    status,
  } = form;

  useEffect(() => {
    checkStoreData();
    return () => {};
  }, []);

  const checkStoreData = async () => {
    const authData = await getAuthData();
    authData &&
      setForm({
        _id: authData._id,
        avatar: authData.avatar,
        banner: authData.banner,
        bdate: authData.bdate,
        company: authData.company,
        metro: authData.metro,
        skills: authData.skills,
        adress: authData.adress,
        bio: authData.bio,
        company: authData.company,
        email: authData.email,
        metro: authData.metro,
        name: authData.name,
        phone: authData.phone,
        status: authData.status,
        skills: authData.skills,
        youtube: authData.youtube,
        twitter: authData.twitter,
        instagram: authData.instagram,
        linkedin: authData.linkedin,
        facebook: authData.facebook,
        whatsapp: authData.whatsapp,
      });
  };

  const updateInfo = async () => {
    const token = await getToken();
    // const authData = await getAuthData();
    let formData = {
      _id: form._id,
      avatar: form.avatar,
      banner: form.banner,
      bdate: form.bdate,
      company: form.company,
      metro: form.metro,
      skills: form.skills,
      adress: form.adress,
      bio: form.bio,
      company: form.company,
      email: form.email,
      metro: form.metro,
      name: form.name,
      phone: form.phone,
      status: form.status,
      skills: form.skills,
      youtube: form.youtube,
      twitter: form.twitter,
      instagram: form.instagram,
      linkedin: form.linkedin,
      facebook: form.facebook,
      whatsapp: form.whatsapp,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    try {
      const res = await axios.post(apiUrl + '/api/users/add', formData, config);
      console.log(res.data);
      await setAuthData(res.data);
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
  };
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalInfo}
      onRequestClose={() => this.modalInfo}>
      <View style={styles.modalContainer}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              marginBottom: 40,
            }}>
            Профиль
          </Text>
          <TouchableOpacity
            title="Login"
            style={{padding: 12}}
            onPress={() => _handlerClose()}>
            <Text style={styles.exit_text_button}>Закрыть</Text>
          </TouchableOpacity>
        </View>

        {warning.length > 0 ? (
          <Text style={styles.error}>{warning}</Text>
        ) : null}
        <ScrollView>
          <View>
            <View style={styles.input_container}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                style={styles.text_input}
                placeholder="Enter the name"
                value={name}
                onChangeText={(text) => setForm({...form, name: text})}
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
                placeholder="Enter the bio"
                value={bio}
                onChangeText={(text) => setForm({...form, bio: text})}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'phone-pad'}
                style={styles.text_input}
                placeholder="Enter the status"
                value={status}
                onChangeText={(text) => setForm({...form, status: text})}
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
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity
                title="Login"
                style={[styles.save_button]}
                onPress={() => updateInfo()}>
                <Text style={styles.save_text_button}>Обновить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
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
