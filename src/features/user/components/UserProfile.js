import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from './counterSlice';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
     <div>

            <div className="mx-auto mt-12 bg-slate-200 max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Name
                  </h1>
                  
<h3 className="text-4xl font-bold tracking-tight text-red-500">
                 Email address
                  </h3>

              </div>


              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                
                <p className="mt-0.5 text-sm text-gray-500">Your Addressh
                </p>
               
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

              </div>
            </div>
          </div>
    </div>
  );
}
