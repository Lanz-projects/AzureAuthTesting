// src/App.jsx
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

function SignInButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return <button onClick={handleLogin}>Sign in with Microsoft</button>;
}

function SignOutButton() {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup().catch(e => {
      console.error(e);
    });
  };

  return <button onClick={handleLogout}>Sign out</button>;
}

function Profile() {
  const { accounts } = useMsal();
  const account = accounts[0];

  return (
    <div>
      <h2>Welcome, {account?.name}</h2>
      <p>Email: {account?.username}</p>
      <SignOutButton />
    </div>
  );
}

function Content() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>MSAL Login (React + Vite)</h1>
      {isAuthenticated ? <Profile /> : <SignInButton />}
    </div>
  );
}

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Content />
    </MsalProvider>
  );
}

export default App;
