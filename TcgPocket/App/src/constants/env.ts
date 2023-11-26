type Env = {
  viteApiBaseUrl: string;
  vitePythonApiBaseUrl: string;
};

export const Env: Env = {
  viteApiBaseUrl: import.meta.env.VITE_BASE_API_URL,
  vitePythonApiBaseUrl: import.meta.env.VITE_PYTHON_BASE_API_URL,
} as const;
