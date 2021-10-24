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
import styled from 'styled-components';

import { API, dimensionWidth, mlColors } from '../../../configs/config';
import { getToken, getAuthData } from '../../../utils/asyncStorage';
import MetroModal from '../../../components/MetroModal';
import CategoryModal from '../../../components/CategoryModal';
import Icon from 'react-native-vector-icons/Ionicons';
import { IMAGEPICKER } from '../../../utils/pickerImage';
import { UPLOAD_IMAGE } from '../../../utils/uploadImage';

const Container = styled(ScrollView)`
  margin: 10px;
  max-height: 100vh;
`;

const Scroll = styled(ScrollView)``;

const SaveContainer = styled(View)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

const InputBase = styled(TextInput)`
  background-color: #fff;
  margin-bottom: 10px;
  min-height: 55px;
  padding: 0 15px;
  border-radius: 10px;
`;

const SelectButton = styled(TouchableOpacity)`
  background-color: #fff;
  margin-bottom: 10px;
  height: 55px;
  padding: 0 15px;
  border-radius: 10px;
  flex: 1;
  justify-content: center;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function PostCreate({ route, navigation }) {
  const [imagePath, setImagePath] = useState();
  const [image, setImage] = useState();
  const [isMetro, setIsMetro] = useState(false);
  const [metroSelected, setMetroSelected] = useState();
  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  // const { getUserPostsList } = route.params;

  function goBack() {
    // getUserPostsList();
    navigation.goBack(null);
  }

  const [form, setForm] = useState({
    id: '',
    title: '',
    description: '',
    address: '',
    longitude: '',
    latitude: '',
    price: '',
    phone: '',
    isWhatsapp: false,
  });

  // category_id, metro_id, user_id will be pass with parameters

  const {
    title,
    description,
    address,
    latitude,
    longitude,
    price,
    phone,
    isWhatsapp,
  } = form;

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
      user_id: authData?._id || '6169ae7f2eaf8824f80c9832',
      title: form?.title,
      description: form?.description,
      location: {
        address: form?.address,
        latitude: form?.latitude || '203984',
        longitude: form?.longitude || '203984',
      },
      price: form?.price,
      phone: form?.phone,
      category: categorySelected?._id,
      metro: metroSelected?._id,
      isWhatsapp: form?.isWhatsapp || false,
    };
    try {
      // const data = { ...formData, banner: imagePath };
      const res = await axios.post(
        `${API.apiv1}/api/posts/create`,
        formData,
        config,
      );
      if (res.status !== 200) {
        return Alert.alert('Ошибка!', 'Проверьте соединение с интернетом.');
      }
      Alert.alert('Успешно!', 'Публикация на модерации.');
      await goBack();
    } catch (error) {
      const er = error.response.data;
      console.error(er);
    }
  };
  // const snapPoints = React.useMemo(() => ['10%','25%', '50%', '90%'], []);
  const infoMetro = (value) => {
    setMetroSelected(value);
  };
  const infoCategory = (value) => {
    setCategorySelected(value);
  };

  return (
    <Container>
      <Scroll showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.input_container}>
            <InputBase
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              style={styles.text_input}
              placeholder="Enter the title"
              maxLength={45}
              value={title}
              onChangeText={(text) => setForm({ ...form, title: text })}
            />
            <InputBase
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'default'}
              maxHeight={100}
              multiline={true}
              numberOfLines={12}
              placeholder="Enter the note"
              maxLength={1200}
              value={description}
              onChangeText={(text) => setForm({ ...form, description: text })}
            />
            <InputBase
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="Enter the cost"
              maxLength={12}
              value={price}
              onChangeText={(text) => setForm({ ...form, price: text })}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <InputBase
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
            <InputBase
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={'phone-pad'}
              style={styles.text_input}
              placeholder="+7XXXZZZOORR"
              maxLength={12}
              value={phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />

            <SelectButton onPress={() => setIsMetro(!isMetro)}>
              <Row>
                <Text>Выберите метро</Text>
                <Icon
                  name="arrow-forward-outline"
                  size={20}
                  style={{ color: mlColors.light_blue }}
                />
              </Row>
            </SelectButton>
            <SelectButton onPress={() => setIsCategory(!isCategory)}>
              {!categorySelected ? (
                <Row>
                  <Text>Выберите категорию</Text>
                  <Icon
                    name="arrow-forward-outline"
                    size={20}
                    style={{ color: mlColors.light_blue }}
                  />
                </Row>
              ) : (
                <Row>
                  <Text>{categorySelected.name}</Text>
                </Row>
              )}
            </SelectButton>
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
      </Scroll>
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
          <Text style={styles.save_text_button}> Опубликовать объявление</Text>
        </View>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: 0,
  },
  save_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mlColors.light_green,
    height: 55,
    marginBottom: 10,
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
    height: 50,
    marginBottom: 20,
    borderRadius: 10,
  },
  exit_text_button: {
    color: mlColors.black,
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
