import autoprefixer from 'autoprefixer';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
const Shop = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.magazs_container}>
        <Text style={styles.magazs_container_brand}>Магазины</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6].map((i, id) => {
            return (
              <View style={styles.magazs_item}>
                <View style={styles.magazs_item_cover} />
                <Text style={styles.magazs_item_name}>Название</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.ads}>
        <Text>Рекламный блок ADS</Text>
      </View>
      <View style={styles.products_container}>
        <Text style={styles.products_container_brand}>Продукты</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6].map((i, id) => {
            return (
              <TouchableOpacity style={styles.product_category}>
                <Text style={styles.products_category_name}>
                  Название категории
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {[1, 2, 3, 4, 5, 6].map((i, id) => {
          return (
            <View style={styles.products_item}>
              <View style={styles.products_item_cover} />
              <View>
                <Text style={styles.products_item_name}>Название продукта</Text>
                <Text style={styles.products_item_cost}>
                  Стоимость в рублях
                </Text>
                <Text style={styles.products_item_note}>Описание товара</Text>
                <Text style={styles.products_item_magaz}>
                  Название магазина
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  //ADS
  ads: {
    backgroundColor: '#b4b4b4',
    margin: 10,
    height: 80,
  },

  //MAGAZS
  magazs_container: {},
  magazs_container_brand: {
    fontSize: 30,
    fontWeight: '800',
    padding: 10,
  },
  magazs_item: {
    margin: 10,
  },
  magazs_item_cover: {
    width: 100,
    height: 100,
    backgroundColor: '#ff443f',
    borderRadius: 10,
  },
  magazs_item_name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },

  //PRODUCTS
  products_container: {
    marginTop: 10,
  },
  products_container_brand: {
    fontSize: 30,
    fontWeight: '800',
    padding: 10,
  },
  products_item: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  products_item_cover: {
    width: 100,
    height: 100,
    backgroundColor: '#ff73f8',
    borderRadius: 10,
  },
  products_item_name: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  products_item_cost: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  products_item_note: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  products_item_magaz: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },

  //CATEGORIES
  product_category: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  products_category_name: {
    // flex: 1,
    // flexDirection: 'row',
  },
});
