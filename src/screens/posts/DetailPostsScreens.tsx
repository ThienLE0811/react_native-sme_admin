import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowComponent, TextComponent} from '../../components';
import {Back, Bag, Edit} from 'iconsax-react-native';
import {appColors} from '../../constansts/appColors';
import postsApi from '../../apis/posts';
import {fontFamilies} from '../../constansts/fontFamilies';
import RenderHtml from '../../components/RenderHtml';
import {deletePosts} from '../../redux/reducers/postsReducer';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  sectionComponent: {
    // paddingTop: Number(StatusBar.currentHeight) + 10 || 0,
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    // backgroundColor: appColors.white,
  },
  rowComponent: {
    gap: 5,
    marginBottom: 5,
  },
  title: {
    // marginBottom: 5,
    fontSize: 20,
    fontFamily: fontFamilies.medium,
    color: appColors.white,
  },
  content: {
    marginBottom: 15,
    color: appColors.gray,
  },
  textComponent: {
    marginLeft: 5,
    color: appColors.white,
  },
  imgBg: {
    flex: 1,
    height: 264,
  },
  imgBgStyle: {
    padding: 16,
    resizeMode: 'cover',
    height: 264,
  },

  scrollView: {
    paddingHorizontal: 10,
    backgroundColor: appColors.white,
  },
  scrollViewTop: {
    // height: 255,
    // flex: 1,
    paddingTop: Number(StatusBar.currentHeight) || 0,
    maxHeight: 264,
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
    <>
      {detailPosts && (
        <ScrollView style={styles.scrollViewTop}>
          <ImageBackground
            source={{uri: detailPosts?.thumbUrl}}
            style={styles.imgBg}
            imageStyle={styles.imgBgStyle}>
            <LinearGradient
              colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
              style={styles.sectionComponent}>
              <RowComponent
                justify="space-between"
                styles={styles.rowComponent}>
                <RowComponent>
                  <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Back size={28} color={appColors.gray2} />
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
                    <Edit size={24} color={appColors.white} />
                  </TouchableOpacity>
                </RowComponent>
              </RowComponent>

              <TextComponent
                text={detailPosts?.titleVi || ''}
                styles={styles.title}
              />
            </LinearGradient>
          </ImageBackground>
        </ScrollView>
      )}

      {detailPosts ? (
        <ScrollView style={styles.scrollView}>
          <RenderHtml content={detailPosts?.contentVi || ''} />
        </ScrollView>
      ) : (
        <ActivityIndicator color={appColors.gray} size={22} />
      )}
    </>
  );
};

export default DetailPostsScreens;
