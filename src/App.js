import React from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SingupPage from './pages/SingupPage';


import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
// import { Cart } from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Ckeckout from './pages/Ckeckout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SingupPage></SingupPage>,
  },
  {
    path: '/cart',
    element:<Protected>
      <CartPage></CartPage>
    </Protected>,
  },
  {
    path: '/checkout',
    element:<Protected>
      <Ckeckout></Ckeckout>
    </Protected> ,
  },
  {
    path: '/product-detail/:id',
    element:<Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
