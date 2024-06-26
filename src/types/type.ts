export interface IPost {
  __v: number;
  _id: string;
  body: string;
  category: {
    value: string;
    label: string;
  }[];
  createdAt: Date;
  id: string;
  image: string;
  likes: ILike[];
  title: string;
  updatedAt: Date;
  userId: IUser;
  comments: any;
}
export interface ICREATEPOST {
  title: string;
  body: string;
  category: {
    value: string;
    label: string;
  }[];
}
export interface ILike {
  user: string;
}

export interface IUserID {
  createdAt: Date;
  dob: Date;
  email: string;
  id: string;
  photo: string;
  role: string;
  updatedAt: Date;
  username: string;
}
enum Role {
  user = "user",
  admin = "admin",
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  photo: string;
  role: Role;
  dob: Date;
}

export interface IComment {
  text: string;
  postId: string;
  userId: IUserID;
  createdAt: Date;
  updatedAt: Date;
}
