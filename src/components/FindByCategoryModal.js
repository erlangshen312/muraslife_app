import React, { useEffect, useState } from 'react';
import {
  Modal,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  mlColors,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  dimensionWidth,
  API,
} from '../configs/config';
import PostsLists from './PostsLists';
import { getToken } from '../utils/asyncStorage';
import axios from 'axios';

export default function FindByCategoryModal({
  hide,
  close,
  info,
  data,
  scrollRef,
  refreshing,
  onRefresh,
  navigation,
}) {
  const [text, setQuery] = useState('');
  const [postsByCategory, setPostsByCategory] = useState([]);

  const fdata = text
    ? postsByCategory.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : postsByCategory;

  const _handleChoosed = (sub_category) => {
    getPostsByCategory(sub_category);
    setPostsByCategory([]);
  };

  useEffect(() => {
    getPostsByCategory();
    return () => getPostsByCategory();
  }, [postsByCategory]);

  const getPostsByCategory = async (sub_category) => {
    const descendant_id = sub_category?._id;

    try {
      const res = await axios.get(
        `${API.apiv1}/api/category/find/${descendant_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setPostsByCategory(res.data.result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setPostsByCategory([]);
    goBack();
    this.hide();
  };

  function goBack() {
    // getUserPostsList();
    navigation.goBack(null);
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={hide}
      onRequestClose={handleCloseModal}
      presentationStyle="overFullScreen"
    >
      <View
        style={{
          backgroundColor: mlColors.dark_white,
          height: ITEM_HEIGHT * ITEM_WIDTH,
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{info && info.name}</Text>
          <TouchableOpacity onPressOut={() => close()}>
            <Icon name="close-outline" size={34} />
          </TouchableOpacity>
        </View>
        <View style={styles.search}>
          <Icon name="search-outline" size={22} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Поиск по названию"
            value={text}
            onChangeText={(text) => setQuery(text)}
          />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <TouchableHighlight
                    underlayColor={mlColors.light_blue}
                    onPress={() => _handleChoosed(item)}
                    style={styles.category}
                  >
                    <Text style={styles.category_text}>{item.name}</Text>
                  </TouchableHighlight>
                </>
              );
            }}
          />
        </View>
        <PostsLists
          type={'category'}
          close={() => close()}
          posts={fdata}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
          scrollRef={scrollRef}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 0 : 40,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  search: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mlColors.dark_white,
    borderRadius: 10,
  },
  icon: {
    color: mlColors.light_brown,
    paddingLeft: 10,
  },
  input: {
    height: 50,
    alignItems: 'flex-start',
    fontSize: 17,
    width: dimensionWidth / 1.15,
    paddingLeft: 10,
  },
  list: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    padding: 8,
    marginLeft: 2,
  },
  button_icon: {
    padding: 5,
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    borderRadius: 5,
  },
  button_title: {
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 10,
  },
  category: {
    backgroundColor: mlColors.white,
    marginEnd: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    minWidth: 100,
    maxWidth: 250,
    margin: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 1.41,
    elevation: 3,
  },
  category_text: {
    color: mlColors.primary,
    fontSize: 17,
    // fontWeight: '600',
    fontFamily: 'SourceSansPro-SemiBold',
  },
});
