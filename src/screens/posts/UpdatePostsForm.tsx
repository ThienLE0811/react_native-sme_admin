import React, {useState} from 'react';
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
import {
  InputComponent2,
  RowComponent,
  SpaceComponent,
  TextComponent,
  TextError,
} from '../../components';
import {appColors} from '../../constansts/appColors';
import {Back} from 'iconsax-react-native';
import {fontFamilies} from '../../constansts/fontFamilies';
import postsApi from '../../apis/posts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../types';
import {updateListPosts} from '../../redux/reducers/postsReducer';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const styles = StyleSheet.create({
  sectionComponent: {
    paddingTop: Number(StatusBar.currentHeight) + 10 || 0,
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  contentScrollView: {
    paddingBottom: 5,
  },
  error: {
    color: 'red',
  },
});

const schema = yup.object().shape({
  titleVi: yup.string().max(255).required(),
  slug: yup.string().required(),
  descriptionVi: yup.string().max(5000).required(),
  contentVi: yup.string().required(),
  thumbUrl: yup.string().required(),
  coverImage: yup.string().required(),
});

const UpdatePostsForm = ({route, navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [detailPosts, setDetailPosts] = useState<Posts>();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [isOutstanding, setIsOutstanding] = useState<boolean>(false);

  const {id} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: async () => {
      try {
        const getListPosts = async () => {
          try {
            const res = await postsApi.HandleGetDetailPosts(id, 'POST');
            if (res.data.body.status === 'OK') {
              setDetailPosts(res?.data?.body?.data);
              setIsPublic(res?.data?.body?.data?.active);
              setIsOutstanding(res?.data?.body?.data?.outstanding);
              return res?.data?.body?.data;
            }
          } catch (error) {
            console.log('err:: ', error);
          }
        };

        const data: DetailPosts = await getListPosts();
        console.log('title: ', await getListPosts());

        return {
          titleVi: data.titleVi || '',
          slug: data.slug || '',
          descriptionVi: data.descriptionVi || '',
          contentVi: data.contentVi || '',
          createdTime: data.createdTime || '',
          categories: data.categories || '',
          thumbUrl: data.thumbUrl || '',
          coverImage: data.coverImage || '',
        };
      } catch (error) {
        console.log('err:: ', error);

        return {
          titleVi: '',
          slug: '',
          descriptionVi: '',
          contentVi: '',
          createdTime: '',
          categories: '',
          thumbUrl: '',
          coverImage: '',
        };
      }
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: UpdatePostsForm) => {
    console.log('Data form:: ', data);
    try {
      const res =
        detailPosts &&
        (await postsApi.HandleUpdatePosts(
          {
            id: detailPosts.id,
            active: isPublic,
            titleVi: data.titleVi,
            slug: data.slug,
            descriptionVi: data.descriptionVi,
            contentVi: data.contentVi,
            thumbUrl: data.thumbUrl,
            outstanding: isOutstanding,
            categories: detailPosts.categories.map(value => value.id),
            createdTime: 1705510800000,
            coverImage: data.coverImage,
          },
          'POST',
        ));

      if (res?.data.body.status === 'OK') {
        dispatch(updateListPosts(res?.data.body.data));
        reset();
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
          <ScrollView style={styles.contentScrollView}>
            <View style={styles.input}>
              <TextComponent text={'Tiêu đề'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập tiêu đề bài viết"
                allowClear
                name="titleVi"
                control={control}
              />
              {errors.titleVi && (
                <TextError children={errors.titleVi.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Đường dẫn'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập slug bài viết"
                allowClear
                name="slug"
                control={control}
              />
              {errors.slug && <TextError children={errors.slug.message} />}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Mô tả ngắn'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập mô tả bài viết"
                allowClear
                name="descriptionVi"
                control={control}
              />
              {errors.descriptionVi && (
                <TextError children={errors.descriptionVi.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Nội dung'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập nội dung bài viết"
                allowClear
                name="contentVi"
                control={control}
              />
              {errors.descriptionVi && (
                <TextError children={errors.descriptionVi.message} />
              )}
            </View>
            <SpaceComponent height={10} />

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
              <InputComponent2
                placeHolder="Nhập ngày tạo bài viết"
                allowClear
                name="contentVi"
                control={control}
              />
              {errors.descriptionVi && (
                <TextError children={errors.descriptionVi.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Ngày tạo'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập ngày tạo bài viết"
                allowClear
                name="contentVi"
                control={control}
              />
              {/* {errors.createdTime && (
                <TextError children={errors.createdTime.message} />
              )} */}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Danh mục'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập danh mục bài viết"
                allowClear
                name=""
                control={control}
              />
              {errors.descriptionVi && (
                <TextError children={errors.descriptionVi.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Ảnh đại diện'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập ảnh đại diện bài viết"
                allowClear
                name="thumbUrl"
                control={control}
              />
              {errors.thumbUrl && (
                <TextError children={errors.thumbUrl.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <View style={styles.input}>
              <TextComponent text={'Ảnh cover'} styles={styles.label} />
              <InputComponent2
                placeHolder="Nhập ảnh cover bài viết"
                allowClear
                name="coverImage"
                control={control}
              />
              {errors.coverImage && (
                <TextError children={errors.coverImage.message} />
              )}
            </View>
            <SpaceComponent height={10} />

            <SpaceComponent height={20} />
            <Button
              title="Cập nhật"
              color={appColors.primary}
              onPress={handleSubmit(onSubmit)}
            />
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator color={appColors.gray} size={22} />
      )}
    </SafeAreaView>
  );
};

export default UpdatePostsForm;
