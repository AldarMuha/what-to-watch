export enum AppRoute {
  Root = '/',
  Login = '/login',
  Logout = '/logout',
  MyList = '/mylist',
  Films = '/films',
  Player = '/player',
  NotFound = '/404',
  Comments = '/comments'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const TIMEOUT_SHOW_ERROR = 2000;

export enum HttpCode {
  NotFound = 404
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const genres = {
  'All genres': 'All genres',
  'Comedies': 'Comedy',
  'Crime': 'Crime',
  'Documentary': 'Documentary',
  'Dramas': 'Drama',
  'Horror': 'Horror',
  'Kids & Family': 'Kids & Family',
  'Romance': 'Romance',
  'Sci-Fi': 'Sci-Fi',
  'Thrillers': 'Thriller',
};
