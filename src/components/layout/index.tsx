import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
}

export default Layout;
