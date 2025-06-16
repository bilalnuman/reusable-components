import { createBrowserRouter } from 'react-router-dom';
import { PageNotfound } from '@components/PageNotfound';
import { routes } from './constants';
import LoginForm from './features/auth/components/LoginForm';
import ForgotForm from './features/auth/components/ForgotForm';
import RegistrationForm from './features/auth/components/RegistrationForm';
import VerifyForm from './features/auth/components/VerifyForm';
import ResetForm from './features/auth/components/ResetForm';
import ModalPage from './pages/Modal';
import Table from './pages/Table';
import RouteErrorBoundary from './components/widgets/RouteErrorBoundary';
import ExportButtons from './features/csv&pdf';

const router = createBrowserRouter([
  {
    path: routes.register,
    element: <RegistrationForm />,
  },
  {
    path: routes.login,
    element: <LoginForm />,
    handle: { hideLayout: true },
  },
  {
    path: routes.forgot,
    element: <ForgotForm />,
    handle: { hideLayout: true },
  },
  {
    path: routes.verifyOtp,
    element: <VerifyForm />,
    handle: { hideLayout: true },
  },
  {
    path: routes.resetPassword,
    element: <ResetForm />,
    handle: { hideLayout: true },
  },
  {
    path: routes.modal,
    element: <ModalPage />,
    handle: { hideLayout: true },
  },
  {
    path: routes.table,
    element: <Table />,
    handle: { hideLayout: true },
    errorElement: <RouteErrorBoundary/>,
  },
  {
    path: routes.notfound,
    element: <PageNotfound />,
    handle: { hideLayout: true },
  },
  {
    path: routes.csvandpdf,
    element: <ExportButtons />,
    handle: { hideLayout: true },
  }
]);


export default router;
