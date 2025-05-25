import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Products from './pages';
import Create from '@pages/products/create';
import { PageNotfound } from '@components/PageNotfound';

import Home from '@components/Home';
import FormWidget from './components/widgets/FormWidget';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'forms', element: <FormWidget /> },
      {
        path: 'products',
        children: [
          { index: true, element: <Products /> },
          { path: 'create', element: <Create /> },
        ],
      },
      {
        path: '*',
        element: <PageNotfound />,
        handle: { hideLayout: true },
      }

    ],
  },
]);


export default router;
