export interface RootObject {
  data: IData;
  results: number;
  status: string;
}

export interface IData {
  posts: IPost[];
}

export interface IPost {
  __v: number;
  _id: string;
  body: string;
  category: string;
  createdAt: Date;
  id: string;
  image: string;
  likes: ILike[];
  title: string;
  updatedAt: Date;
  userId: IUserID;
}

export interface ILike {
  user: string;
}

export interface IUserID {
  __v: number;
  _id: string;
  createdAt: Date;
  dob: Date;
  email: string;
  id: string;
  photo: string;
  role: string;
  updatedAt: Date;
  username: string;
}
