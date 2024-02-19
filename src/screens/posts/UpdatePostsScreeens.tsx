import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '../../components';
import {appColors} from '../../constansts/appColors';
import {Back} from 'iconsax-react-native';
import InputComponent from '../../components/InputComponent';
import {fontFamilies} from '../../constansts/fontFamilies';
import postsApi from '../../apis/posts';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 150,
    paddingHorizontal: 20,
  },
  rowComponent: {
    gap: 5,
  },
  label: {
    color: appColors.text,
    fontSize: 18,
    fontFamily: fontFamilies.medium,
  },
  title: {
    marginBottom: 5,
    fontSize: 20,
    fontFamily: fontFamilies.medium,
  },
  input: {
    gap: 5,
  },
  switch: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailSwitch: {
    // flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

const UpdatePostsScreeens = ({route, navigation}: any) => {
  const [detailPosts, setDetailPosts] = useState<Posts>();
  const [title, setTiltle] = useState<string>('');
  const [slugs, setSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [contentVi, setContentVi] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isOutstanding, setIsOutstanding] = useState<boolean>(false);
  const [createdTime, setCreatedTime] = useState<string>('');
  const [thumbUrl, setThumbUrl] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');

  const {id} = route.params;

  useEffect(() => {
    try {
      const getListPosts = async () => {
        const res = await postsApi.HandleGetDetailPosts(id, 'POST');

        if (res.data.body.status === 'OK') {
          setDetailPosts(res?.data?.body?.data);
          setTiltle(res?.data?.body?.data?.titleVi);
          setSlug(res?.data?.body?.data?.slug);
          setDescription(res?.data?.body?.data?.descriptionVi);
          setContentVi(res?.data?.body?.data?.contentVi);
          setIsPublic(res?.data?.body?.data?.active);
          setIsOutstanding(res?.data?.body?.data?.outstanding);
          setCreatedTime(res?.data?.body?.data?.createdTime);
          setThumbUrl(res?.data?.body?.data?.thumbUrl);
          setCoverImage(res?.data?.body?.data?.coverImage);
        }
      };

      getListPosts();
    } catch (error) {
      console.log('err:: ', error);
    }
  }, []);

  const handleUpdatePosts = async () => {
    try {
      const res =
        detailPosts &&
        (await postsApi.HandleUpdatePosts(
          {
            id: detailPosts.id,
            active: isPublic,
            titleVi: title,
            slug: slugs,
            descriptionVi: description,
            contentVi: contentVi,
            thumbUrl: thumbUrl,
            outstanding: isOutstanding,
            categories: detailPosts.categories.map(value => value.id),
            createdTime: 1705510800000,
          },
          'POST',
        ));
      console.log('res:: ', res?.data);
      if (res?.data.body.status === 'OK') {
        navigation.navigate('Main');
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.sectionComponent}>
      <RowComponent justify="flex-start" styles={styles.rowComponent}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Back size={28} color={appColors.text} />
        </TouchableOpacity>
        <TextComponent text="Cập nhật bài viết" title />
      </RowComponent>
      <SpaceComponent height={10} />
      {detailPosts ? (
        <>
          <TextComponent
            text={detailPosts?.titleVi || ''}
            styles={styles.title}
          />
          <SpaceComponent height={10} />
          <ScrollView>
            <View style={styles.input}>
              <TextComponent text={'Tiêu đề'} styles={styles.label} />
              <InputComponent
                value={title}
                onChange={val => setTiltle(val)}
                placeHolder="Nhập tiêu đề bài viết"
                allowClear
                defaultValue={detailPosts?.titleVi}
              />
            </View>
            <View style={styles.input}>
              <TextComponent text={'Đường dẫn'} styles={styles.label} />
              <InputComponent
                value={slugs}
                onChange={val => setSlug(val)}
                placeHolder="Nhập đường dẫn bài viết"
                allowClear
              />
            </View>
            <View style={styles.input}>
              <TextComponent text={'Mô tả ngắn'} styles={styles.label} />
              <InputComponent
                value={description}
                onChange={val => setDescription(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>
            <View style={styles.input}>
              <TextComponent text={'Nội dung'} styles={styles.label} />
              <InputComponent
                value={contentVi}
                onChange={val => setContentVi(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>

            <View style={styles.switch}>
              <View style={[styles.input, styles.detailSwitch]}>
                <TextComponent text={'Công khai'} styles={styles.label} />
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setIsPublic(!isPublic)}
                  value={isPublic}
                />
              </View>

              <View style={[styles.input, styles.detailSwitch]}>
                <TextComponent text={'Nổi bật'} styles={styles.label} />
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setIsOutstanding(!isOutstanding)}
                  value={isOutstanding}
                />
              </View>
            </View>

            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Ngày tạo'} styles={styles.label} />
              <InputComponent
                value={createdTime}
                onChange={val => setCreatedTime(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>

            <View style={styles.input}>
              <TextComponent text={'Danh mục'} styles={styles.label} />
              <InputComponent
                value={title}
                onChange={val => setTiltle(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>
            <View style={styles.input}>
              <TextComponent text={'Ảnh đại diện'} styles={styles.label} />
              <InputComponent
                value={thumbUrl}
                onChange={val => setThumbUrl(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>
            <View style={styles.input}>
              <TextComponent text={'Ảnh cover'} styles={styles.label} />
              <InputComponent
                value={coverImage}
                onChange={val => setCoverImage(val)}
                placeHolder="Nhập tiêu đề tài viết"
                allowClear
              />
            </View>

            <Button
              title="Cập nhật"
              color={appColors.primary}
              onPress={() => handleUpdatePosts()}
            />
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={appColors.gray} size={22} />
      )}
    </SafeAreaView>
  );
};

export default UpdatePostsScreeens;
