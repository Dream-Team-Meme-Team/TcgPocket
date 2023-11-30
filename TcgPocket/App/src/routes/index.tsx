import { Env } from '../constants/env';

export const routes = {
  home: '/',
  inventory: '/inventory',
  cardUpload: '/card-upload',
  decks: '/decks',
  deckBuilder: '/deck-builder',
  adminPortal: '/admin-portal',
  settings: 'settings',
};

export const apiRoutes = {
  games: `${Env.viteApiBaseUrl}/api/games`,
  cards: `${Env.viteApiBaseUrl}/api/cards`,
  sets: `${Env.viteApiBaseUrl}/api/sets`,
  rarities: `${Env.viteApiBaseUrl}/api/rarities`,
  cardTypes: `${Env.viteApiBaseUrl}/api/card-types`,
  attributes: `${Env.viteApiBaseUrl}/api/attributes`,
  decks: `${Env.viteApiBaseUrl}/api/user-decks`,
  userCards: `${Env.viteApiBaseUrl}/api/user-cards`,
  readCard: `${Env.vitePythonApiBaseUrl}/api/read-card`,
  roles: {
    base: `${Env.viteApiBaseUrl}/api/roles`,
    users: `${Env.viteApiBaseUrl}/api/roles/users`,
  },
  users: {
    base: `${Env.viteApiBaseUrl}/api/users`,
    updatePassword: `${Env.viteApiBaseUrl}/api/users/password-update`,
    signIn: `${Env.viteApiBaseUrl}/api/users/sign-in`,
    signOut: `${Env.viteApiBaseUrl}/api/users/sign-out`,
    signedInUser: `${Env.viteApiBaseUrl}/api/users/signed-in-user`,
    role: `${Env.viteApiBaseUrl}/api/users/role`,
    roles: `${Env.viteApiBaseUrl}/api/users/roles`,
  },
};
