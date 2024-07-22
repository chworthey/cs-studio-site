import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './main/components/App.tsx'
import './index.css'
import { AuthenticationResult, EventType, PublicClientApplication } from '@azure/msal-browser';
import { MSALConfig } from './auth/AuthConfig.ts';

const msalInstance = new PublicClientApplication(MSALConfig);

if (!msalInstance.getActiveAccount()) {
  const msalAccounts = msalInstance.getAllAccounts();
  if (msalAccounts.length > 0) {
    const account = msalAccounts[0];
    msalInstance.setActiveAccount(account);
  }
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const authResult = event.payload as AuthenticationResult;
    if (authResult && authResult.account) {
      const account = authResult.account;
      if (account.homeAccountId !== undefined) {
        msalInstance.setActiveAccount(account);
      }
    }
  }
});

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App MSALInstance={msalInstance}/>
  </React.StrictMode>
);
