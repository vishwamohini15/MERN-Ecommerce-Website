'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectitems,
  updatecartAsync,
} from './cartSlice';


import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate } from 'react-router-dom';
import { discountPrice } from '../../app/constants';

export function Cart() {
   const [open, setOpen] = useState(true)
  const dispatch = useDispatch();
    const items=useSelector(selectitems)
  const totalAmount= items.reduce(
    (amount, item)=>discountPrice(item)*item.quantity +amount, 0)
  const totalItems= items.reduce((total, item)=>item.quantity + total, 0)

  const handleQuantity=(e, item)=>{
    dispatch(updatecartAsync({...item, quantity: +e.target.value}))
  }


  const handelRemove=(e, id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  return (
    <>
          {!items.length && <Navigate  to='/' replace={true}></Navigate>}
    
    <div>
      
          <div className="mx-auto mt-12 bg-slate-200 max-w-7xl px-4 sm:px-6 lg:px-8">

     <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h1>

                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {items.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={item.title}
                                 src={item.thumbnail} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.href}>{item.title}</a>
                                    </h3>
                                    <p className="ml-4">${discountPrice(item)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500">
                                     <label htmlFor="email" className="inline mr-3 text-sm/6 font-medium text-gray-900">
                Qty
              </label> 
                                    <select onChange={(e)=>handleQuantity(e, item)} 
                                      value={item.quantity}
                                      >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="3">4</option>
                                      <option value="3">5</option>


                                    </select>
                                    </div>

                                  <div className="flex">
                                    <button
                                    onClick={e=>handelRemove(e,item.id)}
                                    type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                 

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{totalAmount}</p>
                    </div>
                     <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Total Items In Cart</p>
                      <p>{totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <Link to="/checkout">
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    </Link>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                            <Link to="/">
                        
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                           </Link>
                        
                      </p>
                    </div>
                  </div>
                  </div>
</div>
                  </>
  );
}
