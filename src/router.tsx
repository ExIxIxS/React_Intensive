import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import Layout from 'src/components/ui/layout';
import MainPage from 'src/pages/main';
import NotFoundPage from 'src/pages/notFound';
import AboutPage from 'src/pages/about';
import FaqPage from './pages/faq';
import ContactPage from './pages/contact';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<MainPage />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
