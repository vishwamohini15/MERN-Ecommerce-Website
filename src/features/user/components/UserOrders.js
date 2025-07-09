import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {

} from './counterSlice';
import { fetchloggedInUserorderAsync } from '../userSlice';

export function UserOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchloggedInUserorderAsync)
  }, [])
  

  return (
    <div>
      <div>
        
      </div>
    </div>
  );
}
