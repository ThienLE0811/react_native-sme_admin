import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
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
import {Add} from 'iconsax-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {postsSelector, setListPosts} from '../../redux/reducers/postsReducer';
import {fontFamilies} from '../../constansts/fontFamilies';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: Number(StatusBar.currentHeight) + 10 || 0,
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
        elevation: 2,
      },
    }),
  },
  title: {
    fontSize: 15,
    flex: 1,
    color: appColors.text,
    fontFamily: fontFamilies.medium,

    // backgroundColor: 'green',
  },
  rowComponent: {
    gap: 8,
    alignItems: 'flex-start',
  },
  logo: {
    width: appInfo.sizes.WIDTH * 0.2,
    height: 68,
    borderRadius: 4,
    // resizeMode: 'contain',
  },
  iconEdit: {
    // backgroundColor: 'coral',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
});

type ItemProps = {
  title: string;
  thumbUrl?: string;
  onPressDetail: () => void;
  onPressUpdate: () => void;
};

const Item = ({title, thumbUrl, onPressDetail, onPressUpdate}: ItemProps) => {
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
        <TouchableOpacity onPress={onPressUpdate} style={styles.iconEdit}>
          <FontAwesome name={'edit'} size={20} color={appColors.gray} />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

const PostsScreens = ({navigation}: any) => {
  // const [listPosts, setListPosts] = useState<Array<Posts>>([]);
  const dispatch = useDispatch();
  const listPosts = useSelector(postsSelector);

  const limit = 10;
  // const [data, setData] = useState([]);
  // Mục đich xử lý giao diện khi callApi
  const [UI, setUI] = useState(false);
  const start = useRef<number>(0);
  // Khi Loadmore mà hết dữ liệu =>>true
  const isStop = useRef<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  // Hạn chế việc loading, luôn luôn 1 api được chạy
  const isLoading = useRef<boolean>(false);
  useEffect(() => {
    getData('refresh');
    isStop.current = false;
  }, [isRefresh]);

  const getData = async (type: 'refresh' | 'loadMore') => {
    const checkLimit = listPosts.length % limit;

    if (isLoading.current === true) {
      return;
    }
    if (type === 'loadMore' && isStop.current === true) {
      return;
    }

    if (type === 'refresh') {
      isStop.current = false;
    }

    if (checkLimit !== 0) {
      isStop.current = true;
    }

    if (type === 'loadMore') {
      start.current++;
    }

    try {
      setUI(true);
      isLoading.current = true;
      //call api
      const res = await postsApi.HandleGetListPosts(
        {
          start: start.current,
          limit: limit,
        },
        'POST',
      );
      await new Promise(resolve => setTimeout(resolve, 1000));
      isLoading.current = false;
      if (res.data.body.status === 'OK') {
        // if (res.data.body.data.items.length < limit) {
        //   isStop.current = true;
        // }
        if (type === 'refresh') {
          dispatch(setListPosts(res.data.body.data.items));
        }
        if (type === 'loadMore') {
          dispatch(setListPosts(listPosts.concat(res.data.body.data.items)));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUI(false);
    }
  };

  const renderFooterList = useMemo(() => {
    if (UI) {
      return <ActivityIndicator color={'red'} />;
    }
    // if (listPosts.length === 0 && isStop.current) {
    //   return <Text>Danh sách trống</Text>;
    // }

    if (isStop.current) {
      return <Text>Danh sách đã hết</Text>;
    }
    return <View />;
  }, [UI]);

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

  const handleShowCreateScreensPost = () => {
    navigation.navigate('Create Posts');
  };

  return (
    <SafeAreaView style={styles.sectionComponent}>
      <RowComponent justify="space-between">
        <TextComponent text="Danh sách bài viết" title />
        <TouchableOpacity onPress={handleShowCreateScreensPost}>
          <Add size={32} color={appColors.primary} />
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={10} />
      <FlatList
        data={listPosts}
        keyExtractor={(item, idx) => idx + ''}
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
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          getData('loadMore');
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              start.current = 0;
              dispatch(setListPosts([]));
              setIsRefresh(!isRefresh);
              getData('refresh');
            }}
          />
        }
        ListFooterComponent={
          <View style={{alignItems: 'center', marginVertical: 10}}>
            {renderFooterList}
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default PostsScreens;
