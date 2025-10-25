export const useAuth = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return {
    isAuthenticated: !!token,
  };
};
