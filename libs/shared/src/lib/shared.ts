export const API_ROUTES = {
  MATCHES: '/matches',
  RESULTS: '/results',
  TOURNAMENTS: '/tournaments',
  ENROLLMENTS: '/enrollments',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  STATUS: '/auth/status',
  USER: '/users',
  DRAFTS: '/drafts',
  DRAFT_SCORECARDS: '/draft-scorecards',
};

export enum Statuses {
  UNITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
}
