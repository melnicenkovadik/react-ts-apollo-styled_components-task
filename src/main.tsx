import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './app/index.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client.ts';
import { AppWrapper } from './app/styles.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ApolloProvider>
    </React.StrictMode>
  </React.StrictMode>
);
