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
import {Back} from 'iconsax-react-native';
import {appColors} from '../../constansts/appColors';
import postsApi from '../../apis/posts';
import {fontFamilies} from '../../constansts/fontFamilies';
import RenderHtml from '../../components/RenderHtml';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 120,
    paddingHorizontal: 20,
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
});

const DetailPostsScreens = ({route, navigation}: any) => {
  const {id} = route.params;
  const [detailPosts, setDetailPosts] = useState<Posts>();

  useEffect(() => {
    try {
      const getListPosts = async () => {
        const res = await postsApi.HandleGetDetailPosts(id, 'POST');
        console.log('res:: ', res.data);
        if (res.data.body.status === 'OK') {
          setDetailPosts(res?.data?.body?.data);
        }
      };

      getListPosts();
    } catch (error) {
      console.log('err:: ', error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.sectionComponent}>
      <RowComponent justify="flex-start" styles={styles.rowComponent}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Back size={28} color={appColors.text} />
        </TouchableOpacity>
        <TextComponent text={'Chi tiết bài viết: '} title />
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
