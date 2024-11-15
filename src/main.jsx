import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'
import { store, persistor } from './redux/store';
import './index.css'
import App from './App.jsx'
import EmployeeList from './components/EmployeeList/EmployeeList.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />
  },
  {
    path:'/list',
    element:<EmployeeList />
  }
 ])
 createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)