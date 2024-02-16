import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '../../components';
import {appColors} from '../../constansts/appColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: appColors.white,
    padding: 18,
    marginVertical: 8,
    borderRadius: 10,
    display: 'flex',
  },
  title: {
    fontSize: 20,
    flex: 1,
  },
  rowComponent: {
    gap: 5,
  },
});
const DATA = [
  {
    id: 1,
    title:
      'First Item sdsd sdsd sdsdsd sdsd sdsd sdsds  sds sdsdsd dsd  sds 12345555',
  },
  {
    id: 2,
    title: 'Second Item',
  },
  {
    id: 3,
    title: 'Third Item',
  },
  {
    id: 4,
    title: 'Third Item',
  },
  {
    id: 5,
    title: 'Third Item',
  },
  {
    id: 6,
    title: 'Third Item',
  },
  {
    id: 7,
    title: 'Third Item',
  },
  {
    id: 8,
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => {
  return (
    <View style={styles.item}>
      <RowComponent
        styles={styles.rowComponent}
        justify="space-between"
        onPress={() => console.log('123')}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => console.log('123')}>
          <FontAwesome name={'edit'} size={20} color={appColors.gray} />
        </TouchableOpacity>
      </RowComponent>

      {/* <View style={{width: 'auto'}}>
        <Button
          title="Sửa "
          onPress={() => console.log('!23')}
          color={appColors.primary}></Button>
      </View> */}
    </View>
  );
};

const PostsScreens = () => {
  return (
    <>
      <SafeAreaView style={styles.sectionComponent}>
        <TextComponent text="Danh sách bài viết" title />
        <SpaceComponent height={10} />
        <FlatList
          data={DATA}
          renderItem={({item}) => <Item title={item.title} />}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </>
  );
};

export default PostsScreens;
