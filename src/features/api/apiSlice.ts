import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserLogin, UserLogout } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://blog-backend-production-2d72.up.railway.app/',
  credentials: 'include' as const,
});

const handleLogout = (api: any) => {
  console.log('Executing logout procedure...');
  // Dispatch logout action
  api.dispatch(UserLogout());

  // Clear localStorage
  localStorage.clear();

  // Clear cookies
  document.cookie.split(';').forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });

  // Redirect
  window.location.href = '/auth/login';
};

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  try {
    console.log('Making initial request:', args);
    let result = await baseQuery(args, api, extraOptions);
    console.log('Initial request result:', result);

    if (result?.error) {
      console.log('Error detected:', result.error);

      // Check for both 403 and 401 status codes
      if (result.error.status === 403 || result.error.status === 401) {
        console.log('Attempting token refresh...');

        try {
          const refreshResult = await baseQuery(
            'auth/refresh',
            api,
            extraOptions
          );
          console.log('Refresh result:', refreshResult);

          if (refreshResult?.data) {
            console.log('Refresh successful, updating credentials');
            api.dispatch(
              UserLogin({
                token: refreshResult.data.token,
                currentUser: refreshResult.data.currentUser,
              })
            );

            // Retry original request
            console.log('Retrying original request');
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log('Refresh failed, logging out');
            handleLogout(api);
            return {
              error: {
                status: 403,
                data: {
                  message: 'Your session has expired. Please log in again.',
                },
              },
            };
          }
        } catch (refreshError) {
          console.error('Refresh token error:', refreshError);
          handleLogout(api);
          return {
            error: {
              status: 403,
              data: { message: 'Authentication error. Please log in again.' },
            },
          };
        }
      }
    }

    return result;
  } catch (error) {
    console.error('Critical error in baseQueryWithReauth:', error);
    handleLogout(api);
    return {
      error: {
        status: 500,
        data: { message: 'An unexpected error occurred. Please log in again.' },
      },
    };
  }
};

// Add an interceptor to check auth state on each request
const addAuthCheckInterceptor = (api: any) => {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      if (response.status === 403 || response.status === 401) {
        handleLogout(api);
      }
      return response;
    } catch (error) {
      console.error('Fetch interceptor error:', error);
      return Promise.reject(error);
    }
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['users', 'posts', 'comments', 'likes'],
  endpoints: () => ({}),
});
