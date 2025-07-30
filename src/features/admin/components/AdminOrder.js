import React, { useEffect, useState } from 'react'
import { discountPrice, ITEMS_PER_PAGE } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { PencilIcon, EyeIcon} from '@heroicons/react/24/outline'
import { fetchAllOrdersAsync, selectOrders, selectTotalorders, updateOrderAsync } from '../../order/orderSlice';

export const AdminOrder = () => {
     const [page, setpage]=useState(1);
     const dispatch=useDispatch()
     const orders=useSelector(selectOrders)
     const totalOrders=useSelector(selectTotalorders)
     const [editableorderId, setEditableorderid]=useState(-1)
  
   useEffect(() => {
        const pagination= {_page:page, _limit:ITEMS_PER_PAGE}
        dispatch(fetchAllOrdersAsync({pagination}))
  
        //TODO: server will filter deleted products
      }, [dispatch, page])

      const handleShow=(order)=>{
        setEditableorderid(order.id)
        
      }

       const handleEdit=()=>{
        console.log("handel Edit");
        
      }

      const handleUpdate=(e, order)=>{
        const updateOrder= {...order, status:e.target.value}
        dispatch(updateOrderAsync(updateOrder))
      }
  return (
<div className="overflow-x-auto ">
  <div className=" bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>

            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
              <th className="py-3 px-6 text-left">order</th>
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-center">Total Amount</th>
              <th className="py-3 px-6 text-center">Shiping Address</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>

          </thead>
          <tbody className="text-gray-600 text-sm font-light">
         {orders.map(order=>    <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                  
                  </div>
                  <span className="font-medium">{order.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
               {order.items.map(item=><div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={item.thumbnail}
                    />
                  </div>
                  <span>{item.title}- #{item.quantity} - ${discountPrice(item)}</span>
                </div> )}

                
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                 $ {order.totalAmount}
                </div>
              </td>
              <td className="py-3 px-6 text-center ">
                <div >
                  <div>
                 <strong>{order.selectedAddress.name}</strong>
                  </div>
                <div> {order.selectedAddress.name},</div>
                <div>           {order.selectedAddress.street},</div>
                <div>      {order.selectedAddress.city},</div>
                <div>   {order.selectedAddress.state},</div>
                <div>    {order.selectedAddress.pincode},</div>
                <div>  {order.selectedAddress.phone},</div>

                </div>
              </td>
              <td className="py-3 px-6 text-center">
              {order.id === editableorderId ? ( 

                 <select onChange={(e)=>handleUpdate(e,order)}>
                  <option value="pending">pending</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">canceled</option>
                </select>
                
               
              ) : (
                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                  {order.status}
                </span> 
              )}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110">
                   <EyeIcon className='w-8 h-8' onClick={e=>handleShow(order)}></EyeIcon>
                  </div>
                  <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-110">
                   <PencilIcon className='w-8 h-8' onClick={e=>handleEdit(order)}></PencilIcon>
                  
                  </div>
                
                </div>
              </td>
            </tr> )}
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}
