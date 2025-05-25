import { Outlet, useMatches } from 'react-router-dom';
import Header from '@components/widgets/Header';
import Sidebar from '@components/widgets/Sidebar';
import Footer from '@components/widgets/Footer';

// Add this type for route handle
interface RouteHandle {
  hideLayout?: boolean;
}

const App = () => {
  const matches = useMatches();

  const hideLayout = matches.some(
    (match) => (match.handle as RouteHandle)?.hideLayout
  );

  return (
    <div className="flex flex-col h-screen">
      {!hideLayout && <Header />}
      <div className="flex flex-1 overflow-hidden">
        {!hideLayout && <Sidebar />}
        <div className="flex-1 overflow-y-auto p-5 pt-3">
          <main className='min-h-[calc(100vh-120px)]'>
            <Outlet />
          </main>
          {!hideLayout && <Footer />}
        </div>
      </div>
    </div>
  );
};

export default App;
