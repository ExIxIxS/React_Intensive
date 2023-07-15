import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import appStore from 'src/store';
import Header from 'src/components/ui/header';

function Layout(): JSX.Element {
  return (
    <Provider store={appStore}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </Provider>
  );
}

export default Layout;
