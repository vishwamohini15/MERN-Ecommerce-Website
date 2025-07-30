export function createOrder(order) {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
  const data=await response.json()
  resolve({data})
}
);
}


export function UpdateOrder(order) {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/orders/'+order.id,{
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    })
  const data=await response.json()
  resolve({data})
}
  );
}


export function fetchAllOrders(pagination) {
  let queryString='';
   for(let key in pagination){
  queryString +=`${key}=${pagination[key]}&`
  }

    console.log("Final queryString:", queryString);

  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/orders?'+queryString)
  const data=await response.json()
  const totalOrders=await response.headers.get('X-Total-Count')|| data.length
  resolve({data:{orders:data,totalOrders:+totalOrders}})
} 
  );
}