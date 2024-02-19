interface Posts {
  id: number;
  titleVi: string;
  active: boolean;
  slug: string;
  descriptionVi?: string;
  contentVi?: string;
  thumbUrl: string;
  outstanding?: boolean;
  modifiedTime: string;
  createdTime: string;
  categories: [
    {
      id: number;
      titleVi: string;
      slug: string;
    },
  ];
}

interface DetailPosts {
  titleVi: string;
  slug: string;
  descriptionVi: string;
  contentVi: string;
  thumbUrl: string;
  categories: [
    {
      id: number;
      title: string;
    },
  ];
  createdTime: string;
  modifiedTime: string;
  modifiedBy: string;
  coverImage: string;
}

type GetListPostReq = {
  start?: number;
  limit?: number;
  categories?: Array<number>;
  outstanding?: boolean;
  slugCategories?: Array<string>;
  sort?: Array<{
    sortField: string;
    sortType: string;
  }>;
};

type GetListPostRes = {
  total: number;
  items: Array<News>;
};

type GetDetailPostReq = {
  slug: string;
};

interface GetDetailPostRes extends DetailNews {}

interface UpdatePosts {
  id: number;
  active: boolean;
  titleVi: string;
  slug: string;
  descriptionVi: string;
  contentVi: string;
  thumbUrl: string;
  outstanding: boolean;
  categories: Array<number>;
  createdTime: number;
}
