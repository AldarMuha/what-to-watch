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
