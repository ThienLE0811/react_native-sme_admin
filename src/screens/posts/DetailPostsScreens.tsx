import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RowComponent, TextComponent} from '../../components';
import {Back, Bag, Edit} from 'iconsax-react-native';
import {appColors} from '../../constansts/appColors';
import postsApi from '../../apis/posts';
import {fontFamilies} from '../../constansts/fontFamilies';
import RenderHtml from '../../components/RenderHtml';
import {deletePosts} from '../../redux/reducers/postsReducer';
import {useDispatch} from 'react-redux';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: Number(StatusBar.currentHeight) + 10 || 0,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: appColors.white,
  },
  rowComponent: {
    gap: 5,
    marginBottom: 5,
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: fontFamilies.medium,
  },
  content: {
    marginBottom: 15,
    color: appColors.gray,
  },
  textComponent: {
    marginLeft: 5,
  },
});

const DetailPostsScreens = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const [detailPosts, setDetailPosts] = useState<Posts>();

  useEffect(() => {
    try {
      const getListPosts = async () => {
        const res = await postsApi.HandleGetDetailPosts(id, 'POST');

        if (res.data.body.status === 'OK') {
          setDetailPosts(res?.data?.body?.data);
        }
      };

      getListPosts();
    } catch (error) {
      console.log('err:: ', error);
    }
  }, []);

  const handleDeletePosts = async () => {
    try {
      const res = await postsApi.HandleDeletePosts(
        detailPosts ? [detailPosts?.id] : [],

        'POST',
      );

      if (res?.data.body.status === 'OK') {
        dispatch(deletePosts(detailPosts?.id));
        navigation.navigate('Main');
      }
    } catch (error) {}
  };

  const handleShowUpdatePosts = () => {
    navigation.navigate('Update Posts', {
      id: detailPosts?.id,
    });
  };

  return (
    <SafeAreaView style={styles.sectionComponent}>
      <RowComponent justify="space-between" styles={styles.rowComponent}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Back size={28} color={appColors.text} />
          </TouchableOpacity>
          <TextComponent
            text={'Chi tiết bài viết: '}
            title
            styles={styles.textComponent}
          />
        </RowComponent>

        <RowComponent styles={styles.rowComponent}>
          <TouchableOpacity onPress={() => handleDeletePosts()}>
            <Bag size={24} color={appColors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShowUpdatePosts()}>
            <Edit size={24} color={appColors.gray} />
          </TouchableOpacity>
        </RowComponent>
      </RowComponent>

      {detailPosts ? (
        <>
          <TextComponent
            text={detailPosts?.titleVi || ''}
            styles={styles.title}
          />
          <ScrollView>
            <RenderHtml content={detailPosts?.contentVi || ''} />
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={appColors.gray} size={22} />
      )}
    </SafeAreaView>
  );
};

export default DetailPostsScreens;
