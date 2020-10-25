import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

export default function PostList() {
  console.log(DATA);
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.color}
      horizontal
      //   snapToInterval={ITEM_WIDTH + SPACING * 2}
      //   contentContainerStyle={{
      //     paddingRight: width - ITEM_WIDTH - SPACING * 2,
      //   }}
      decelerationRate={'fast'}
      renderItem={({item}) => {
        return (
          <View key={data._id}>
            <View style={styles.block_container}>
              <View style={styles.block}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', {data})}>
                  <Text style={styles.title_block}>{data.title}</Text>
                </TouchableOpacity>
                <Text style={styles.cost_block}>
                  {data.cost && data.cost + ' ' + 'RUB'}
                </Text>
              </View>
              <View>
                <Text style={{marginBottom: 5}}>{data.note}</Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginBottom: 5,
                      display: 'flex',
                      direction: 'ltr',
                    }}>
                    <View
                      style={{
                        backgroundColor: `${data.color}`,
                        width: 15,
                        height: 15,
                        padding: 10,
                        marginRight: 10,
                        borderRadius: 100,
                      }}>
                      <Text>{data.number}</Text>
                    </View>
                    <Text>{data._metro + ' - ' + data.number}</Text>
                  </Text>
                  <Text style={{marginBottom: 5}}></Text>
                </View>
                <Text style={{marginBottom: 5}}>{data.adress}</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => handlerCall(data.phone)}
                  style={styles.button_block}>
                  <Text style={styles.text_button}> Позвонить </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlerWhatsapp(data.phone)}
                  style={styles.button_block}>
                  <Text style={styles.text_button}> WhatsApp </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // width: ITEM_WIDTH,
    // height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    // padding: SPACING,
  },
});
