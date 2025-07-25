import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SingupPage from './pages/SingupPage';


import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
// import { Cart } from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Ckeckout from './pages/Ckeckout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchitemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInuser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrdersuccessPage from './pages/orderSuccessPage';
import UserOrderpage from './pages/UserOrderpage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsyc, selectUserInfo } from './features/user/userSlice';
import { Logout } from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
  {
    path: '/order-success/:id',
    element:(
      <OrdersuccessPage></OrdersuccessPage>
    )
  },
  {
    path: '/orders',
    element:(
      <UserOrderpage></UserOrderpage>
    )
  },
  {
    path: '/profile',
    element:(
      <UserProfilePage></UserProfilePage>
    )
  },
   {
    path: '/logout',
    element:(
      <Logout></Logout>
    )
  },
  {
    path: '/forgot-password',
    element:(
      <ForgotPasswordPage></ForgotPasswordPage>
    )
  },
  {
    path: '*',
    element:(
      <PageNotFound></PageNotFound>
    )
  },
]);


function App() {
  const dispatch=useDispatch()
    const user=useSelector(selectLoggedInuser)
  
  useEffect(() => {
    if(user){
    dispatch(fetchitemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsyc(user.id))
    }
  }, [dispatch, user])
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
