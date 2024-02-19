import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
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
import postsApi from '../../apis/posts';
import {appInfo} from '../../constansts/appInfo';
import {Add, Back} from 'iconsax-react-native';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    paddingBottom: 50,
    backgroundColor: appColors.white,
  },
  item: {
    backgroundColor: appColors.white,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    display: 'flex',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(99, 99, 99, 0.2)',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  rowComponent: {
    gap: 10,
  },
  logo: {
    width: appInfo.sizes.WIDTH * 0.2,
    height: 68,
    // resizeMode: 'contain',
  },
});

type ItemProps = {
  title: string;
  thumbUrl?: string;
  onPressDetail: () => void;
  onPressUpdate: () => void;
};

const Item = ({title, thumbUrl, onPressDetail, onPressUpdate}: ItemProps) => {
  console.log('thumbUrl:: ', thumbUrl);

  return (
    <View style={styles.item}>
      <RowComponent
        styles={styles.rowComponent}
        justify="space-around"
        onPress={onPressDetail}>
        <Image
          source={{
            uri: thumbUrl,
          }}
          style={styles.logo}
        />
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <TouchableOpacity onPress={onPressUpdate}>
          <FontAwesome name={'edit'} size={20} color={appColors.gray} />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

const PostsScreens = ({navigation}: any) => {
  const [listPosts, setListPosts] = useState<Array<Posts>>([]);

  useEffect(() => {
    try {
      const getListPosts = async () => {
        const res = await postsApi.HandleGetListPosts(
          {
            start: 0,
            limit: 10,
          },
          'POST',
        );
        if (res.data.body.status === 'OK') {
          setListPosts(res?.data?.body?.data?.items);
        }
      };

      getListPosts();
    } catch (error) {
      console.log('err:: ', error);
    }
  }, []);

  const handleShowDetailPosts = ({id}: {id: number}) => {
    navigation.navigate('Detail Posts', {
      id: id,
    });
  };
  const handleShowUpdatePosts = ({id}: {id: number}) => {
    navigation.navigate('Update Posts', {
      id: id,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.sectionComponent}>
        <RowComponent justify="space-between">
          <TextComponent text="Danh sách bài viết" title />
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Add size={28} color={appColors.primary} />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={10} />

        {listPosts.length > 0 ? (
          <FlatList
            data={listPosts}
            renderItem={({item}) => {
              return (
                <Item
                  title={item.titleVi}
                  thumbUrl={item.thumbUrl}
                  onPressDetail={() => handleShowDetailPosts({id: item.id})}
                  onPressUpdate={() => handleShowUpdatePosts({id: item.id})}
                />
              );
            }}
            keyExtractor={item => item?.slug}
          />
        ) : (
          <ActivityIndicator color={appColors.gray} size={22} />
        )}
      </SafeAreaView>
    </>
  );
};

export default PostsScreens;
