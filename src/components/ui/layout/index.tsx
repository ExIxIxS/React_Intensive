import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from 'src/components/ui/header';
import { getCurrentMediaQuery } from 'src/utils/mediaQueryFunctions';
import { useEffect } from 'react';

function Layout(): JSX.Element {
  const dispatch = useDispatch();
  const handleResize = () => {
    const newMediaQuery = getCurrentMediaQuery();

    dispatch({
      type: 'mediaQuery/setMediaQuery',
      payload: newMediaQuery,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
