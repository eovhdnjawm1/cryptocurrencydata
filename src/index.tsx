import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query"
import { RecoilRoot } from 'recoil';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);



const client = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);