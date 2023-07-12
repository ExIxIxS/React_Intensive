import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './components/layout';
import Main from './pages/main';
import NotFound from './pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
