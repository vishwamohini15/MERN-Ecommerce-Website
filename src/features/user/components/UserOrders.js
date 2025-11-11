import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchloggedInUserorderAsync, selectUserInfo, selectUserOrders } from '../userSlice';
import { discountPrice } from '../../../app/constants';

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const orders = useSelector(selectUserOrders)

  useEffect(() => {
    dispatch(fetchloggedInUserorderAsync(userInfo.id))
  }, [])


  return (
    <div>
      {Array.isArray(orders) && orders.length > 0 ? (
      orders.map(order => (
        <div>
          <div>

            <div className="mx-auto mt-12 bg-slate-200 max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  order  Number is: #{order.id}</h1>
                  
<h3 className="text-4xl font-bold tracking-tight text-red-500">
                  order Status: {order.status}</h3>

                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                    order.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img alt={item.product.title}
                            src={item.product.thumbnail} className="size-full object-cover" />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.product.href}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4">{discountPrice(item.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="email" className="inline mr-3 text-sm/6 font-medium text-gray-900">
                                Qty:{item.quantity}
                              </label>
                             
                            </div>

                            <div className="flex">
                             
                            </div>
                          </div>
                        </div>
                      </li>
                    ))):(
                       <li className="py-6 text-gray-500">No items found</li>
                    )}
                  </ul>
                </div>
              </div>


              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${order.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items In Cart</p>
                  <p>{order.totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Your Selected Receving Addressh
                </p>
               
               {order.selectedAddress ? (
                   <div 
                    className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200">
          
          <div className="flex min-w-0 gap-x-4 px-4">
                     
            
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{order.selectedAddress.street}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{order.selectedAddress.pincode}</p>

            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">phone : {order.selectedAddress.phone}</p>
            <p className="text-sm/6 text-gray-900">{order.selectedAddress.city}</p>
          </div>
        </div>
) : (
  <p className="mt-2 text-gray-500">No address found</p>
)}
              </div>
            </div>
          </div>
        </div>
      ))):(
      <p className="text-center mt-10 text-gray-500">No orders yet.</p>
      )}
    </div>
  );
}
