export function addTocart(item) {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    })
  const data=await response.json()
  //TODO: on server it will only return some info uf user(not password)
  resolve({data})
}
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/cart?userId='+userId)
  const data=await response.json()
  resolve({data})
}
  );
}

export function updateCart(update) {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    })
  const data=await response.json()
  //TODO: on server it will only return some info uf user(not password)
  resolve({data})
}
  );
}

export function deleteItemFormCart(itemId) {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
    })
  const data=await response.json()
  //TODO: on server it will only return some info uf user(not password)
  resolve({data:{id:itemId}})
}
  );
}


export function resetCard(userId) {
  //get all items of user cart and then delete each item
  return new Promise(async(resolve)=>{
 const response= await fetchItemsByUserId(userId)
 const items= response.data;
 for(let item of items){
  await deleteItemFormCart(item.id)
 }
 resolve({status:'success'})
})
}