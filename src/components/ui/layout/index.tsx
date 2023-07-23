import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from 'src/components/ui/header';
import { getCurrentMediaQuery } from 'src/utils/mediaQueryFunctions';
import { useEffect } from 'react';
import { setMediaQuery } from 'src/store/features/mediaQuerySlice';

function Layout(): JSX.Element {
  const dispatch = useDispatch();

  const handleResize = () => {
    const newMediaQuery = getCurrentMediaQuery();
    const action = setMediaQuery(newMediaQuery);

    dispatch(action);
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
