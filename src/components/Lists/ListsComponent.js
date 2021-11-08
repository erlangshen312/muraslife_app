import React from 'react';
import {
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
import styled from 'styled-components';

const ListsComponent = ({ close, posts, onRefresh, refreshing, scrollRef }) => {
  const navigation = useNavigation();
  const _handleOpenDetail = async (item) => {
    navigation.navigate('Details', { item });
  };

  return (
    <ScrollContainer
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Container>
        {posts?.map((item) => (
          <Card key={item?._id} onPress={() => _handleOpenDetail(item, close)}>
            <CardContent>
              <CardTitle numberOfLines={2}>{item?.title}</CardTitle>
              <View>
                <CardPrice>
                  <CardPriceTitle numberOfLines={1}>
                    {item?.price}
                  </CardPriceTitle>
                  <CardPriceIcon name="ruble-sign" size={12} />
                </CardPrice>
                <CardTime numberOfLines={2}>
                  {moment(item?.date).format('Do MMM HH:MM')}
                </CardTime>
              </View>
            </CardContent>
          </Card>
        ))}
      </Container>
    </ScrollContainer>
  );
};

export { ListsComponent };

const ScrollContainer = styled(ScrollView)``;
const Container = styled(View)`
  margin: 10px;
`;

const Card = styled(TouchableOpacity)`
  height: 150px;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #fff;
  shadow-color: #7b7b7b;
  elevation: 3;
`;

const CardContent = styled(View)`
  flex: 1;
  padding-horizontal: 5px;
  justify-content: space-between;
`;

const CardTitle = styled(Text)`
  font-size: 18px;
  font-family: SourceSansPro-Regular;
  flex-shrink: 1;
`;

const CardDescription = styled(Text)``;

const CardPrice = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CardPriceTitle = styled(Text)`
  font-size: 18px;
  font-family: SourceSansPro-Bold;
  padding-right: 3px;
`;

const CardPriceIcon = styled(FontAwesome5)``;

const CardTime = styled(Text)`
  font-family: SourceSansPro-Regular;
`;

const CardFavorite = styled(TouchableOpacity)`
  height: 60px;
  width: 60px;
  padding: 10px;
  background-color: #1297ad;
  elevation: 0.5;
`;
