import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { dimensionHeight, dimensionWidth, newsUrl } from '../../configs/config';
import news1 from './news.json';
import moment from 'moment';

const News = ({ navigation }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    getNews();
  }, [getNews]);

  const getNews = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      // const res = await axios.get(newsUrl, config);
      // const sm = JSON.stringify(res.data);
      // console.warn(news);
      // setNews(res.data);
      setNews(news1);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            key={item.id.toString()}
            onPress={() => navigation.navigate('Details', { item })}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-start',
                margin: 6,
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 12,
                shadowColor: 'black',
                shadowOpacity: 0.08,
                shadowOffset: { width: 0, height: 3 },
                // shadowRadius: 10,
                elevation: 1,
              }}
            >
              <Image
                source={{ uri: item.jetpack_featured_media_url }}
                style={{
                  width: dimensionWidth / 3,
                  height: dimensionHeight / 7,
                  borderRadius: 10,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: 10,
                  padding: 5,
                  borderRadius: 12,
                  shadowColor: 'black',
                  shadowOpacity: 0.08,
                  shadowOffset: { width: 0, height: 3 },
                  // shadowRadius: 10,
                  elevation: 1,
                }}
              >
                <Text
                  style={{
                    fontWeight: '500',
                    marginBottom: 10,
                  }}
                >
                  {item.title.rendered}
                </Text>
                {/* NEED TO UPDATE DATE TO READABLE */}
                <Text
                  style={{
                    // fontWeight: '500',
                    // marginBottom: 10,
                    flex: 1,
                    alignItems: 'flex-end',
                  }}
                >
                  {moment(item.date).format()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default News;

const styles = StyleSheet.create({});
