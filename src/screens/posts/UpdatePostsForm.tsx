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
import {
  InputComponent2,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {appColors} from '../../constansts/appColors';
import {Back} from 'iconsax-react-native';
import InputComponent from '../../components/InputComponent';
import {fontFamilies} from '../../constansts/fontFamilies';
import postsApi from '../../apis/posts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../types';
import {updateListPosts} from '../../redux/reducers/postsReducer';
import {Controller, useForm} from 'react-hook-form';
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
  title: yup.string().max(255).required(),
});

const UpdatePostsForm = ({route, navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [detailPosts, setDetailPosts] = useState<Posts>();

  const {id} = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: async () => {
      const getListPosts = async () => {
        try {
          const res = await postsApi.HandleGetDetailPosts(id, 'POST');
          // console.log('res:: ', res.data.body.data);
          if (res.data.body.status === 'OK') {
            setDetailPosts(res?.data?.body?.data);

            return res?.data?.body?.data;
          }
        } catch (error) {
          console.log('err:: ', error);
        }
      };
      const data = await getListPosts();
      console.log('title: ', await getListPosts());

      return {
        title: data && data.titleVi,
      };
    },
  });

  // useEffect(() => {
  //   try {
  //     const getListPosts = async () => {
  //       const res = await postsApi.HandleGetDetailPosts(id, 'POST');

  //       if (res.data.body.status === 'OK') {
  //         setDetailPosts(res?.data?.body?.data);
  //         setTiltle(res?.data?.body?.data?.titleVi);
  //       }
  //     };

  //     getListPosts();
  //   } catch (error) {
  //     console.log('err:: ', error);
  //   }
  // }, []);
  const onSubmit = data => console.log('data form:: ', data);

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
      // dispatch(
      //   updatePosts({
      //     id: detailPosts.id,
      //     active: isPublic,
      //     titleVi: title,
      //     slug: slugs,
      //     descriptionVi: description,
      //     contentVi: contentVi,
      //     thumbUrl: thumbUrl,
      //     outstanding: isOutstanding,
      //     categories: detailPosts.categories.map(value => value.id),
      //     createdTime: 1705510800000,
      //   }),
      // );
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
                name="title"
                rules={{
                  required: true,
                }}
                control={control}
              />
              <TextComponent
                text={errors.title?.message || ''}
                styles={styles.error}
              />
            </View>

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

/*

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

*/
