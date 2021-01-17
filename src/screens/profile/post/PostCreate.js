import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {apiUrl, dimensionWidth, mlColors} from '../../../configs/config';
import {getToken, getAuthData} from '../../../utils/asyncStorage';
import CategoryListModal from './CategoryListModal';
import MetroModal from '../../../components/MetroModal';
import CategoryModal from '../../../components/CategoryModal';

export default function PostCreate({route, navigation}) {
  const [warning, setWarning] = useState('');

  const [isMetro, setIsMetro] = useState(false);
  const [metroSelected, setMetroSelected] = useState();

  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();

  const {getUserPostsList} = route.params;

  const {width, height} = Dimensions.get('screen');
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = height * 0.75;

  function goBack() {
    getUserPostsList();
    navigation.goBack(null);
  }

  const [form, setForm] = useState({
    _id: '',
    title: '',
    note: '',
    adress: '',
    cost: '',
    category: '',
    metro: '',
    phone: '',
    banner: '',
  });
  const {title, note, adress, cost, phone, banner} = form;

  const createPost = async () => {
    const token = await getToken();
    const authData = await getAuthData();

    let formData = {
      user_id: authData._id,
      title: form.title,
      note: form.note,
      adress: form.adress,
      cost: form.cost,
      phone: form.phone,
      category: categorySelected.id,
      metro: metroSelected,
      // banner: form.banner,
    };
    console.log('CREATE ', formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    try {
      const res = await axios.post(`${apiUrl}/api/posts/`, formData, config);
      // await setAuthData(res.data);
      if (res.status !== 200)
        return Alert.alert('Ошибка!', 'Проверьте соединение с интернетом.');
      Alert.alert('Успешно!', 'Публикация на проверке.');
      await goBack();
    } catch (error) {
      const er = error.response.data;
      console.error(er);
      setWarning(er);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.modalContainer}>
      <View>
        <View style={styles.input_container}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'default'}
            style={styles.text_input}
            placeholder="Enter the title"
            maxLength={45}
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
            maxLength={1200}
            value={note}
            onChangeText={(text) => setForm({...form, note: text})}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'phone-pad'}
            style={styles.text_input}
            placeholder="Enter the cost"
            maxLength={12}
            value={cost}
            onChangeText={(text) => setForm({...form, cost: text})}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={'default'}
            style={styles.text_input}
            placeholder="Enter the adress"
            maxLength={100}
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
          <TouchableOpacity
            style={[styles.text_input, {flex: 1, justifyContent: 'center'}]}
            onPress={() => setIsCategory(!isCategory)}>
            {categorySelected && categorySelected ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    alignItems: 'center',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  {categorySelected.title}
                </Text>
              </View>
            ) : (
              <Text>Выберите категорию</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button_container}>
          <TouchableOpacity
            style={[styles.save_button]}
            onPress={() => createPost()}>
            <Text style={styles.save_text_button}>Публиковать</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.exit_button]}
            onPress={() => goBack()}>
            <Text style={styles.exit_text_button}>Назад</Text>
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
