import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API, mlColors} from '../../../configs/config';
import CategoryMenu from './CategoryMenu';
import {getToken} from '../../../utils/asyncStorage';
import FindByCategoryModal from '../../../components/FindByCategoryModal';
import CategoryModal from '../../../components/CategoryModal';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Category = () => {
  const [isModal, setIsModal] = useState(false);
  const [categories, setCategories] = useState();
  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    getCategory();
    return () => {
      getCategory();
    };
  }, []);

  const getCategory = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${API.apiv1}/api/category`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      setCategories(res.data);
    } catch (err) {
      const er = err.response.data;
      console.warn(er);
    }
  };

  const _handleChoosed = (item) => {
    fetchAPI(item);
    setCategorySelected(item);
    setIsCategory(!isCategory);
  };

  const fetchAPI = async (item) => {
    const token = await getToken();
    try {
      const res = await axios.get(
        `${API.apiv1}/api/category/find/${item._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.menu} onPress={() => setIsModal(true)}>
        <Icon name="menu-outline" size={22} />
      </TouchableOpacity> */}
      <View style={{paddingLeft: 10}}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableHighlight
                underlayColor={mlColors.light_blue}
                onPress={() => _handleChoosed(item)}
                style={styles.category}>
                {/* <Icon
                  name="close-outline"
                  size={10}
                  style={styles.category_icon}
                /> */}
                <Text style={styles.category_text}>{item.title}</Text>
              </TouchableHighlight>
            );
          }}
        />
      </View>
      <CategoryModal
        info={categories}
        hide={isModal}
        close={() => setIsModal(false)}
      />
      <FindByCategoryModal
        hide={isCategory}
        close={() => setIsCategory(false)}
        info={categorySelected}
        data={data}
        refreshing={refreshing}
        scrollRef={scrollRef}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  menu: {
    backgroundColor: mlColors.dark,
    padding: 8,
    // marginRight:2,
    borderRadius: 5,
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
    shadowRadius: 1.41,
    elevation: 3,
  },
  category_text: {
    color: mlColors.blue,
    fontSize: 17,
    // fontWeight: '600',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  category_icon: {
    color: mlColors.light_brown,
  },
});

export default Category;
