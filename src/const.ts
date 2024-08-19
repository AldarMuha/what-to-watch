export enum AppRoute {
  Root = '/',
  Login = '/login',
  Logout = '/logout',
  MyList = '/mylist',
  Films = '/films',
  Player = '/player'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const TIMEOUT_SHOW_ERROR = 2000;
