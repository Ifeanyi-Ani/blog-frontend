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
  id: string;
}
