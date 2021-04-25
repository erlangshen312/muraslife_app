import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { API, dimensionWidth, mlColors } from '../../../configs/config';
import { getToken, getAuthData } from '../../../utils/asyncStorage';
import MetroModal from '../../../components/MetroModal';
import CategoryModal from '../../../components/CategoryModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGEPICKER } from '../../../utils/pickerImage';
import { UPLOAD_IMAGE } from '../../../utils/uploadImage';

export default function PostCreate({ route, navigation }) {
  const [imagePath, setImagePath] = useState();
  const [image, setImage] = useState();
  const [isMetro, setIsMetro] = useState(false);
  const [metroSelected, setMetroSelected] = useState();
  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const { getUserPostsList } = route.params;

  function goBack() {
    getUserPostsList();
    navigation.goBack(null);
  }

  const [form, setForm] = useState({
    id: '',
    title: '',
    note: '',
    address: '',
    cost: '',
    category: '',
    metro: '',
    phone: '',
    banner: '',
  });
  const { title, note, address, cost, phone, banner } = form;

  const createPost = async () => {
    const token = await getToken();
    const authData = await getAuthData();

    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    };
    const formData = {
      user_id: authData._id,
      title: form.title,
      note: form.note,
      address: form.address,
      cost: form.cost,
      phone: form.phone,
      category: categorySelected.id,
      metro: metroSelected._id,
    };
    try {
      console.warn(formData);
      const data = { ...formData, banner: imagePath };
      const res = await axios.post(`${API.apiv1}/api/posts/`, data, config);
      if (res.status !== 200) {
        return Alert.alert('Ошибка!', 'Проверьте соединение с интернетом.');
      }
      Alert.alert('Успешно!', 'Публикация поступит в сеть через 29 мин.');
      await goBack();
    } catch (error) {
      const er = error.response.data;
      console.error(er);
      // setWarning(er);
    }
  };
  // const snapPoints = React.useMemo(() => ['10%','25%', '50%', '90%'], []);
  const infoMetro = (value) => {
    setMetroSelected(value);
  };
  const infoCategory = (value) => {
    setCategorySelected(value);
  };

  const handlePickImage = async () => {
    const picker = await IMAGEPICKER(true, false, 'photo');
    await setImage(picker);
    const image = await UPLOAD_IMAGE(picker);
    await setImagePath(image);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.modalContainer}
    >
      <View>
        <View style={styles.input_container}>
          <View>
            <TouchableOpacity
              style={{
                height: 150,
                width: 150,
                backgroundColor: 'rgba(236,239,241 ,1)',
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => handlePickImage()}
            >
              {image ? (
                <Image
                  source={{ uri: image.path }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Icon name="camera-outline" size={40} />
              )}
            </TouchableOpacity>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'default'}
            style={styles.text_input}
            placeholder="Enter the title"
            maxLength={45}
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
            maxLength={1200}
            value={note}
            onChangeText={(text) => setForm({ ...form, note: text })}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'phone-pad'}
            style={styles.text_input}
            placeholder="Enter the cost"
            maxLength={12}
            value={cost}
            onChangeText={(text) => setForm({ ...form, cost: text })}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              style={[styles.text_input, { minWidth: '83%' }]}
              placeholder="Enter the adress"
              maxLength={100}
              value={address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />
            <TouchableOpacity
              style={[
                { paddingHorizontal: 5, justifyContent: 'center' },
                styles.text_input,
                { backgroundColor: mlColors.light_blue },
              ]}
            >
              <Icon
                name="location-outline"
                size={20}
                style={{ color: mlColors.white }}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'phone-pad'}
            style={styles.text_input}
            placeholder="+7XXXZZZOORR"
            maxLength={12}
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
                    marginHorizontal: 10,
                  }}
                >
                  {metroSelected.name}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Выберите метро</Text>
                <Icon
                  name="arrow-forward-outline"
                  size={20}
                  style={{ color: mlColors.light_blue }}
                />
              </View>
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text>Выберите категорию</Text>
                <Icon
                  name="arrow-forward-outline"
                  size={20}
                  style={{ color: mlColors.light_blue }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity
            style={[styles.save_button]}
            onPress={() => createPost()}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon
                name="megaphone-outline"
                size={20}
                style={{ color: mlColors.white, paddingHorizontal: 5 }}
              />
              <Text style={styles.save_text_button}> Публиковать</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exit_button]}
            onPress={() => goBack()}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Icon
                name="close-circle-outline"
                size={20}
                style={{ color: mlColors.light_brown, paddingHorizontal: 5 }}
              />
              <Text style={styles.exit_text_button}>Отмена</Text>
            </View>
          </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image_container: {
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
    paddingVertical: 10,
  },
  text_input: {
    height: 55,
    backgroundColor: 'rgba(236,239,241 ,1)',
    marginBottom: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  save_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.light_green,
    height: 55,
    marginBottom: 20,
    borderRadius: 10,
  },
  save_text_button: {
    color: mlColors.white,
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
    color: mlColors.light_brown,
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
