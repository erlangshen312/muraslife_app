import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API, dimensionWidth, mlColors } from '../../../configs/config';
import { getToken, getAuthData } from '../../../utils/asyncStorage';
import MetroModal from '../../../components/MetroModal';
import CategoryModal from '../../../components/CategoryModal';

export default function PostUpdate({ route, navigation }) {
  const { item } = route.params;
  // const { getUserPostsList } = route.params;

  const [warning, setWarning] = useState('');

  const [isMetro, setIsMetro] = useState(false);
  const [metroSelected, setMetroSelected] = useState();

  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();

  const [form, setForm] = useState({
    _id: '',
    user_id: '',
    title: '',
    note: '',
    adress: '',
    cost: '',
    category: '',
    metro: '',
    phone: '',
    banner: '',
  });
  const { title, note, adress, cost, category, metro, phone, banner } = form;

  const checkStoreData = async () => {
    item &&
      setForm({
        _id: item._id,
        user_id: item.user,
        title: item.title,
        note: item.note,
        adress: item.adress,
        cost: JSON.stringify(item.cost),
        phone: JSON.stringify(item.phone),
        category: item.category,
        metro: item.metro,
        // banner: form.banner,
      });
  };

  useEffect(() => {
    // checkStoreData();
  }, []);

  function goBack() {
    navigation.goBack(null);
    getUserPostsList();
  }

  const updatePost = async () => {
    const token = await getToken();
    const authData = await getAuthData();

    let formData = {
      _id: form._id,
      user_id: form.user_id,
      title: form.title,
      note: form.note,
      adress: form.adress,
      cost: form.cost,
      phone: form.phone,
      category: form.category,
      metro: form.metro,
      // banner: form.banner,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    try {
      // const res = await axios.post(
      //   `${API.apiv1}/api/posts/update`,
      //   formData,
      //   config,
      // );
      // await setAuthData(res.data);
      // if (res.status !== 200) {
      //   return Alert.alert('Ошибка!', 'Проверьте соединение с интернетом.');
      // }
      Alert.alert('Успешно!', 'Публикация на проверке.');
      await goBack();
    } catch (error) {
      console.error(error);
      // const er = error.response.data.errors;
      // setWarning(er);
    }
  };

  const infoMetro = (value) => {
    setMetroSelected(value);
  };

  const infoCategory = (value) => {
    setCategorySelected(value);
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
              onChangeText={(text) => setForm({ ...form, title: text })}
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
              onChangeText={(text) => setForm({ ...form, note: text })}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="Enter the cost"
              value={cost}
              onChangeText={(text) => setForm({ ...form, cost: text })}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.text_input}
              placeholder="Enter the adress"
              value={adress}
              onChangeText={(text) => setForm({ ...form, adress: text })}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="+7XXXZZZOORR"
              value={phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
            <TouchableOpacity
              style={[styles.text_input, { flex: 1, justifyContent: 'center' }]}
              onPress={() => setIsMetro(!isMetro)}
            >
              {metroSelected && metroSelected ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={[
                      { backgroundColor: `${metroSelected.color}` },
                      styles.metro_icon,
                    ]}
                  >
                    <Text>{metroSelected.number}</Text>
                  </View>
                  <Text
                    style={{
                      alignItems: 'center',
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    {metroSelected.name}
                  </Text>
                </View>
              ) : (
                <Text>Выберите метро</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.text_input, { flex: 1, justifyContent: 'center' }]}
              onPress={() => setIsCategory(!isCategory)}
            >
              {categorySelected && categorySelected ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      alignItems: 'center',
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    {categorySelected.title}
                  </Text>
                </View>
              ) : (
                <Text>Выберите категорию</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button_container}>
            <Pressable
              style={[styles.save_button]}
              onPress={() => updatePost()}
            >
              <Text style={styles.save_text_button}>Публиковать</Text>
            </Pressable>
            <Pressable style={[styles.exit_button]} onPress={() => goBack()}>
              <Text style={styles.exit_text_button}>Назад</Text>
            </Pressable>
            {/* {warning.length > 0 ? (
              <Text style={styles.error}>{warning}</Text>
            ) : null} */}
          </View>
        </View>
        <MetroModal
          hide={isMetro}
          close={() => setIsMetro(false)}
          info={infoMetro}
        />
        <CategoryModal
          hide={isCategory}
          close={() => setIsCategory(false)}
          info={infoCategory}
        />
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
    height: 20,
    marginBottom: 20,
    borderRadius: 30,
  },
  exit_text_button: {
    color: mlColors.brown,
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
