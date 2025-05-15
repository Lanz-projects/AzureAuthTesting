export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: 'http://localhost:5173/auth/callback',
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};