import { Outlet } from 'react-router-dom';
import Header from 'src/components/ui/header';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
