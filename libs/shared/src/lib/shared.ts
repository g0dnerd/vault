export const API_ROUTES = {
  MATCHES: '/matches',
  RESULTS: '/results',
  TOURNAMENTS: '/tournaments',
  ENROLLMENTS: '/enrollments',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  STATUS: '/auth/status',
  USER: '/users',
  PLAYERS: '/draft-players',
  DRAFTS: '/drafts',
  DRAFT_SCORECARDS: '/draft-scorecards',
  IMAGES: '/images',
};

export enum Statuses {
  UNITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
}

export enum ImageStatus {
  INITIAL = 'initial',
  UPLOADING = 'uploading',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const eloProportionality: number = 36;
