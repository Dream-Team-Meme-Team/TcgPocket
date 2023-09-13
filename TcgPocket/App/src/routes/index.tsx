import { Env } from '../constants/env';

export const routes = {
  home: '/',
  inventory: '/inventory',
  cardUpload: '/card-upload',
  deckBuilder: '/deck-builder',
  settings: 'settings',
};

export const apiRoutes = {
  games: {
    base: `${Env.viteApiBaseUrl}/api/games`,
    id: `${Env.viteApiBaseUrl}/api/games/:id`,
  },
  sets: {
    base: `${Env.viteApiBaseUrl}/api/sets`,
    id: `${Env.viteApiBaseUrl}/api/sets/:id`,
  },
  rarities: {
    base: `${Env.viteApiBaseUrl}/api/rarities`,
    id: `${Env.viteApiBaseUrl}/api/rarities/:id`,
  },
  cardTypes: {
    base: `${Env.viteApiBaseUrl}/api/card-types`,
    id: `${Env.viteApiBaseUrl}/api/card-types/:id`,
  },
  attributes: {
    base: `${Env.viteApiBaseUrl}/api/attributes`,
    id: `${Env.viteApiBaseUrl}/api/attributes/:id`,
  },
  decks: {
    base: `${Env.viteApiBaseUrl}/api/decks`,
    id: `${Env.viteApiBaseUrl}/api/decks/:id`,
  },
  roles: {
    base: `${Env.viteApiBaseUrl}/api/roles`,
    id: {
      base: `${Env.viteApiBaseUrl}/api/roles/:id`,
      users: `${Env.viteApiBaseUrl}/api/roles/:id/users`,
    },
  },
  users: {
    base: `${Env.viteApiBaseUrl}/api/users`,
    updatePassword: `${Env.viteApiBaseUrl}/api/users/password-update`,
    signIn: `${Env.viteApiBaseUrl}/api/users/sign-in`,
    signOut: `${Env.viteApiBaseUrl}/api/users/sign-out`,
    id: {
      base: `${Env.viteApiBaseUrl}/api/users/:id`,
      role: `${Env.viteApiBaseUrl}/api/users/:id/role`,
      roles: `${Env.viteApiBaseUrl}/api/users/:id/roles`,
    },
  },
};
