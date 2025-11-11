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
import AdminHome from './pages/AdminHome';
import ProtectedAdimn from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminproductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
// import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_LEFT
// };


const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected>
      <Home></Home>
    </Protected>,
  },
   {
    path: '/admin',
    element: <ProtectedAdimn>
      <AdminHome></AdminHome>
    </ProtectedAdimn>,
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
    path: '/admin/product-detail/:id',
    element:<ProtectedAdimn>
      <AdminProductDetailPage></AdminProductDetailPage>
    </ProtectedAdimn>,
  },
  {
    path: '/admin/product-Form',
    element:<ProtectedAdimn>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdimn>,
  },
  {
    path: '/admin/orders',
    element:<ProtectedAdimn>
      <AdminOrdersPage></AdminOrdersPage>
    </ProtectedAdimn>,
  },
   {
    path: '/admin/product-Form/edit/:id',
    element:<ProtectedAdimn>
      <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdimn>,
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
        <ToastContainer position="bottom-left" autoClose={5000} />
    </div>
  );
}

export default App;
