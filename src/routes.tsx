import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Products from './pages';
// import Create from '@pages/products/create';
import { PageNotfound } from '@components/PageNotfound';

import Home from '@components/Home';
import FormWidget from './components/widgets/FormWidget';
import Table from './pages/Table';
import { routes } from './constants';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: routes.table, element: <Table /> },
      { path: routes.forms, element: <FormWidget /> },
      {
        path: routes.products,
        children: [
          { index: true, element: <Products /> },
          // { path: 'create', element: <Create /> },
        ],
      },
      {
        path: routes.notfound,
        element: <PageNotfound />,
        handle: { hideLayout: true },
      }

    ],
  },
]);


export default router;
