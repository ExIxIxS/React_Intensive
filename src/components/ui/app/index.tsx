import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import router from 'src/router';
import appStore from 'src/store';

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
