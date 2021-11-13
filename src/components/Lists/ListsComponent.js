import React from 'react';
import {
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
import styled from 'styled-components';
import { Suspender } from '../_common/Suspender';

const ListsComponent = ({
  close,
  posts,
  onRefresh,
  refreshing,
  scrollRef,
  isLoading,
}) => {
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
      <Suspender loading={isLoading} />
      <Container>
        {posts?.map((item) => (
          <Card key={item?._id} onPress={() => _handleOpenDetail(item, close)}>
            <Content>
              <Title numberOfLines={1}>{item?.title}</Title>
              <Description numberOfLines={2}>
                {item?.description} Ноавя жизнь новая часть кола кола ка кдела
                что жеделать вот жопа еще немного и что бужеьНоавя жизнь новая
                часть кола кола ка кдела что жеделать вот жопа еще немного и что
                бужеь
              </Description>
              <View>
                <Metro>
                  <MetroTitle numberOfLines={1}>
                    {item?.metro?.name} метро Киевская
                  </MetroTitle>
                  <MetroNumber color="#1d77e8" />
                </Metro>
                <Location numberOfLines={1}>
                  {item?.location?.address} Крымская 485 корпус 59
                </Location>
                <Time numberOfLines={1}>
                  {moment(item?.date).format('Do MMMM HH:MM')}
                </Time>
              </View>
            </Content>
            <RightContent>
              <Price>
                <PriceTitle numberOfLines={1}>{item?.price}</PriceTitle>
                <PriceIcon name="ruble-sign" size={12} />
              </Price>
              <Favorite>
                <FontAwesome5 name="heart" size={24} />
              </Favorite>
            </RightContent>
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
  display: flex;
  flex-direction: row;
  height: 140px;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #f5f5f5;
  shadow-color: #717171;
  elevation: 2;
`;

const Content = styled(View)`
  flex: 1;
  padding-horizontal: 5px;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-family: SourceSansPro-Regular;
  flex-shrink: 1;
`;

const Description = styled(Text)`
  font-size: 15px;
  color: #666;
  font-family: SourceSansPro-Regular;
  flex-shrink: 1;
`;

const Price = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PriceTitle = styled(Text)`
  font-size: 16px;
  padding-right: 3px;
  font-family: SourceSansPro-Bold;
`;

const PriceIcon = styled(FontAwesome5)``;

const Metro = styled(TouchableOpacity)`
  justify-content: flex-start;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
`;
const MetroTitle = styled(Text)``;
const MetroNumber = styled(View)`
  padding: 3px;
  width: 8px;
  height: 8px;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  border-radius: 100px;
  opacity: 0.7;
  background-color: ${(props) => props.color};
`;

const Location = styled(Text)``;

const RightContent = styled(View)`
  justify-content: space-between;
  align-items: flex-end;
`;

const Time = styled(Text)`
  font-family: SourceSansPro-Regular;
`;

const Favorite = styled(TouchableOpacity)`
  padding: 2px;
`;
