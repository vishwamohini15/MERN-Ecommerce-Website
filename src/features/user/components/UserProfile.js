import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../userSlice';
// import { selectUserInfo } from '../userSlice';

export default function Userprofile() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserInfo)

  const handelEdit=()=>{

  }

  const handelRemove=()=>{
    
  }

  return (
    <div>

      <div>
        <div className="mx-auto mt-12 bg-slate-200 max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Name : {user.name ? user.name : 'new user'}
            </h1>

            <h3 className="text-4xl font-bold tracking-tight text-red-500">
              Email address : {user.email}
            </h3>

          </div>


          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

            <p className="mt-0.5 text-sm text-gray-500">Your Addressh
            </p>
            {user.addresses.map((address, index) =>
              <div
                className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200">

                <div className="flex min-w-0 gap-x-4 px-4">


                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{address.name}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{address.street}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{address.pincode}</p>

                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">phone : {address.phone}</p>
                  <p className="text-sm/6 text-gray-900">{address.city}</p>
                </div>

                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={e => handelEdit(e, index)}
                    type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Edit
                  </button>
                  <button
                    onClick={e => handelRemove(e, index)}
                    type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Remove
                  </button>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}
