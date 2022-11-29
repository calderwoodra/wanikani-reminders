export const swrHook = swrResponse => {
  const { data, error } = swrResponse;
  const loading = !error && !data;
  return { data, loading, error };
};
