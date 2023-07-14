import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from 'src/components/ui/layout';
import Main from 'src/pages/main';
import NotFound from 'src/pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
