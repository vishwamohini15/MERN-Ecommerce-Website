export function fetchAllproduct() {
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products')
  const data=await response.json()
  resolve({data})
}
  );
}

export function fetchproductsByfilter(filter, sort) {
  //filter={"category":["smartphone","laptops"]}
  //sort={_sort:"price", _order="desc"}

  //TODO: on server we will support multi values
  let queryString=''
  for (let key in filter) {
  const categoryValues = filter[key];
  if (categoryValues.length > 0) {
    categoryValues.forEach((value) => {
      queryString += `${key}=${value}&`;
    });
  }
}
  
  for(let key in sort){
  queryString +=`${key}=${sort[key]}&`
  }

  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products?'+queryString)
  const data=await response.json()
  resolve({data})
}
  );
}

