import React, {useState} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RowComponent, SpaceComponent, TextComponent} from '../../components';
import {appColors} from '../../constansts/appColors';
import {Back} from 'iconsax-react-native';
import InputComponent from '../../components/InputComponent';
import {fontFamilies} from '../../constansts/fontFamilies';
import postsApi from '../../apis/posts';
import {useDispatch} from 'react-redux';
import {createPosts} from '../../redux/reducers/postsReducer';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: appColors.white,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: appColors.primary,
  },
  textButton: {
    color: 'white',
    fontSize: 16,

    fontFamily: fontFamilies.medium,
  },
});

const CreatePostsScreeens = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [title, setTiltle] = useState<string>('');
  const [slugs, setSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [contentVi, setContentVi] = useState<string>('');
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isOutstanding, setIsOutstanding] = useState<boolean>(false);
  const [createdTime, setCreatedTime] = useState<string>('');
  const [thumbUrl, setThumbUrl] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');

  const handleCreatePosts = async () => {
    try {
      const res = await postsApi.HandleCreatePosts(
        {
          active: isPublic,
          titleVi: title,
          slug: slugs,
          descriptionVi: description,
          contentVi: contentVi,
          thumbUrl: thumbUrl,
          outstanding: isOutstanding,
          categories: [8],
          createdTime: 1705510800000,
        },
        'POST',
      );
      if (res?.data.body.status === 'OK') {
        dispatch(createPosts(res?.data.body.data));
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
        <TextComponent text="Tạo mới bài viết" title />
      </RowComponent>
      <SpaceComponent height={10} />
      {
        <>
          <SpaceComponent height={10} />
          <ScrollView>
            <View style={styles.input}>
              <TextComponent text={'Tiêu đề'} styles={styles.label} />
              <InputComponent
                value={title}
                onChange={val => setTiltle(val)}
                placeHolder="Nhập tiêu đề bài viết"
                allowClear
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
                  trackColor={{false: '#767577', true: appColors.primary}}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setIsPublic(!isPublic)}
                  value={isPublic}
                />
              </View>

              <View style={[styles.input, styles.detailSwitch]}>
                <TextComponent text={'Nổi bật'} styles={styles.label} />
                <Switch
                  trackColor={{false: '#767577', true: appColors.primary}}
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

            {/* <Button
              title="Tạo mới"
              color={appColors.primary}
              onPress={() => handleCreatePosts()}
            /> */}
            <Pressable
              style={styles.button}
              onPress={() => handleCreatePosts()}>
              <Text style={styles.textButton}>Tạo mới</Text>
            </Pressable>
          </ScrollView>
        </>
      }
    </SafeAreaView>
  );
};

export default CreatePostsScreeens;
