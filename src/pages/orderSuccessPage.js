import React, { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInuser } from '../features/auth/authSlice'
import { resetOrder } from '../features/order/orderSlice'

const OrdersuccessPage = () => {
  const params=useParams()
const dispatch=useDispatch()
const user=useSelector(selectLoggedInuser)

  useEffect(() => {
    //reset card
   dispatch(resetCartAsync(user.id))

   //reset currentOrder
   dispatch(resetOrder())
  }, [dispatch, user])
  
  return (
    <>
       {!params.id && <Navigate  to='/' replace={true}></Navigate>}
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            you can check your order in my Account  My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            
          </div>
        </div>
      </main>
    </>

  )
}

export default OrdersuccessPage
