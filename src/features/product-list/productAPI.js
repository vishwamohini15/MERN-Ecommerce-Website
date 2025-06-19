export function fetchAllproduct() {
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products')
  const data=await response.json()
  resolve({data})
}
  );
}

export function fetchproductById(id) {
  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products/'+id)
  const data=await response.json()
  resolve({data})
}
  );
}

export function fetchproductsByfilter(filter, sort, pagination) {
  //filter={"category":["smartphone","laptops"]}
  //sort={_sort:"price", _order="desc"}
  //pagination ={_sort:"price", _order="desc"} //_page=1$_limit=10

  //TODO: on server we will support multi values
  let queryString=''
  for (let key in filter) {
  const categoryValues = filter[key];
  if (categoryValues.length > 0) {
    const lastcategoryvalue=categoryValues[categoryValues.length-1]
      queryString += `${key}=${lastcategoryvalue}&`;
  }
}
  
  for(let key in sort){
  queryString +=`${key}=${sort[key]}&`
  }

   for(let key in pagination){
  queryString +=`${key}=${pagination[key]}&`
  }

    console.log("Final queryString:", queryString);

  return new Promise(async(resolve) =>{
    //todo will not hard coded server URL here
    const response=await fetch('http://localhost:8080/products?'+queryString)
  const data=await response.json()
  const totalItems=await response.headers.get('X-Total-Count')|| data.length
  resolve({data:{products:data,totalItems:+totalItems}})
} 
  );
}


export function fetchCategory() {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/categories')
  const data=await response.json()
  resolve({data})
}
  );
}

export function fetchBrands() {
  return new Promise(async(resolve) =>{
    const response=await fetch('http://localhost:8080/brands')
  const data=await response.json()
  resolve({data})
}
  );
}