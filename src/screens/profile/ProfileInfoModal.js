import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {API, apiUrl, dimensionWidth, mlColors} from '../../configs/config';
import {getAuthData, getToken, setAuthData} from '../../utils/asyncStorage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import MetroModal from '../../components/MetroModal';

export default function ProfileInfoModal({modalInfo, exitModalInfo}) {
  const [warning, setWarning] = useState('');

  const [isMetro, setIsMetro] = useState(false);
  const [metroSelected, setMetroSelected] = useState();

  const [form, setForm] = useState({
    _id: '',
    avatar: '',
    banner: '',
    adress: '',
    bdate: '',
    bio: '',
    company: '',
    email: '',
    metro: '',
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
    return () => {
      checkStoreData();
    };
  }, []);

  const checkStoreData = async () => {
    const authData = await getAuthData();
    console.log(authData);
    authData &&
      setForm({
        _id: authData._id,
        avatar: authData.avatar,
        banner: authData.banner,
        bdate: authData.bdate,
        company: authData.company,
        metroSelected: authData.metro,
        skills: authData.skills,
        adress: authData.adress,
        bio: authData.bio,
        company: authData.company,
        email: authData.email,
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
      metro: metroSelected,
      skills: form.skills,
      adress: form.adress,
      bio: form.bio,
      company: form.company,
      email: form.email,
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
      const res = await axios.post(`${API.apiv1}/api/users/add`, formData, config);
      console.log(res.data);
      await setAuthData(res.data);
      exitModalInfo();
      setWarning('');
    } catch (error) {
      const warning = error.response.data.errors.map((er) => er.msg);
      setWarning(warning);
      console.error(warning);
    }
  };

  const _handlerClose = () => {
    exitModalInfo();
    checkStoreData();
    setWarning('');
  };

  const infoMetro = (value) => {
    setMetroSelected(value);
  };

  console.log('UDPATE METRO:', metroSelected);
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalInfo}
      onRequestClose={() => this.modalInfo}>
      <View style={{padding: 10}}>
        <View
          style={{
            paddingBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'android' ? 0 : 40,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Профиль
          </Text>
          <TouchableOpacity title="Login" onPress={() => _handlerClose()}>
            <Icon name="close-outline" size={34} />
          </TouchableOpacity>
        </View>

        {warning.length > 0 ? (
          <Text style={styles.error}>{warning}</Text>
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.input_container}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                style={styles.text_input}
                placeholder="Enter the name"
                value={name}
                maxLength={45}
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
                maxLength={500}
                onChangeText={(text) => setForm({...form, bio: text})}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                style={styles.text_input}
                placeholder="Enter the status"
                maxLength={100}
                value={status}
                onChangeText={(text) => setForm({...form, status: text})}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'default'}
                style={styles.text_input}
                placeholder="Enter the adress"
                maxLength={150}
                value={adress}
                onChangeText={(text) => setForm({...form, adress: text})}
              />
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={'phone-pad'}
                style={styles.text_input}
                placeholder="+7XXXZZZOORR"
                maxLength={12}
                value={phone}
                onChangeText={(text) => setForm({...form, phone: text})}
              />
              <TouchableOpacity
                style={[styles.text_input, {flex: 1, justifyContent: 'center'}]}
                onPress={() => setIsMetro(!isMetro)}>
                {metroSelected && metroSelected ? (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={[
                        {backgroundColor: `${metroSelected.color}`},
                        styles.metro_icon,
                      ]}>
                      <Text>{metroSelected.number}</Text>
                    </View>
                    <Text
                      style={{
                        alignItems: 'center',
                        fontSize: 16,
                        marginLeft: 10,
                      }}>
                      {metroSelected.name}
                    </Text>
                  </View>
                ) : (
                  <Text>Выберите метро</Text>
                )}
              </TouchableOpacity>
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
          <MetroModal
            hide={isMetro}
            close={() => setIsMetro(false)}
            info={infoMetro}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {},
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
  metro_icon: {
    padding: 5,
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    borderRadius: 5,
  },
});
