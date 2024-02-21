import {appInfo} from '../constansts/appInfo';
import {bodyBuilder, headerRequest} from '../utils';
import axiosClient from './axiosClient';

interface getListPostsReq {
  start?: number;
  limit?: number;
  categories?: Array<number>;
  outstanding?: boolean;
  sort?: Array<{
    sortField: string;
    sortType: string;
  }>;
}

class PostsApi {
  HandleGetListPosts = async (
    // url: string,
    data: getListPostsReq,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'GET',
      data: {
        header: headerRequest('ms-cms-service'),
        body: bodyBuilder('getListPost', {
          start: data.start,
          limit: data.limit,
        }),
      },
    });
  };

  HandleGetDetailPosts = async (
    // url: string,
    id: number,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'GET',
      data: {
        header: headerRequest('ms-cms-service'),
        body: bodyBuilder('getDetailPost', {
          id: id,
        }),
      },
    });
  };
  HandleUpdatePosts = async (
    // url: string,
    data: UpdatePosts,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ) => {
    console.log('data:: ', data);
    return await axiosClient(`${appInfo.BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'GET',
      data: {
        header: headerRequest('ms-cms-service'),
        body: bodyBuilder('updatePost', {
          id: data.id,
          active: data.active,
          titleVi: data.titleVi,
          descriptionVi: data.descriptionVi,
          contentVi: data.contentVi,
          thumbUrl: data.thumbUrl,
          outstanding: data.outstanding,
          categories: data.categories,
          createdTime: data.createdTime,
        }),
      },
    });
  };

  HandleCreatePosts = async (
    // url: string,
    data: CreatePosts,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ) => {
    console.log('data:: ', data);
    return await axiosClient(`${appInfo.BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'GET',
      data: {
        header: headerRequest('ms-cms-service'),
        body: bodyBuilder('createPost', {
          active: data.active,
          titleVi: data.titleVi,
          descriptionVi: data.descriptionVi,
          contentVi: data.contentVi,
          thumbUrl: data.thumbUrl,
          outstanding: data.outstanding,
          categories: data.categories,
          createdTime: data.createdTime,
          coverImage: data.coverImage,
          slug: data.slug,
        }),
      },
    });
  };

  HandleDeletePosts = async (
    // url: string,
    ids: Array<number>,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ) => {
    return await axiosClient(`${appInfo.BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'GET',
      data: {
        header: headerRequest('ms-cms-service'),
        body: bodyBuilder('deletePost', {
          ids: ids,
        }),
      },
    });
  };
}

const postsApi = new PostsApi();
export default postsApi;
