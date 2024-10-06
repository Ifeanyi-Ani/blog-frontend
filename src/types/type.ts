export interface Tag {
  _id?: string;
  id?: string;
  text?: string;
}

export interface IPost {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  author: IUser;
  tags?: Partial<Tag>[];
  likes?: string[];
  comments?: any[];
  images?: string[];
}
export interface ICREATEPOST {
  title: string;
  content: string;
  images?: string[];
  tags?: Partial<Tag>[];
}

export interface ILike {
  user: string;
}

enum Role {
  user = "user",
  admin = "admin",
}
export interface IUser {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  photo: string;
  role?: Role;
  dob: Date;
  bio: string;
  github: string;
  linkedin: string;
}

export interface IComment {
  _id: string;
  content: string;
  postId: string;
  userId: IUser;
  parentId?: string;
  parentAuthor?: string;
  likes?: any[];
  dislikes?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
