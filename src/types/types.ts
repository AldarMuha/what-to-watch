import { FilmInfo } from './films';

export type User = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
}

export type UserAuth = Pick<User, 'email'> & { password: string };

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type NewComment = Pick<Comment, 'comment' | 'rating'> & Pick<FilmInfo, 'id'>;
