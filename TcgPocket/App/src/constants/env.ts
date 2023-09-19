type Env = {
  viteApiBaseUrl: string;
};

export const Env: Env = {
  viteApiBaseUrl: import.meta.env.VITE_BASE_API_URL,
} as const;
