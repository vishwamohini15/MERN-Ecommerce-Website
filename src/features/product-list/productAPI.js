export function fetchAllproduct() {
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products')
  const data=await response.json()
  resolve({data})
}
  );
}

export function fetchproductsByfilter(filter) {
  for()
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products?')
  const data=await response.json()
  resolve({data})
}
  );
}

