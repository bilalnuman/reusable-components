import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
// import ErrorBoundary from './components/widgets/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import router from './routes';
import './App.css';
import './styles/form.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ErrorBoundary fallback={<div>Oops! Something broke.</div>}> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    {/* </ErrorBoundary> */}

  </React.StrictMode>
);
