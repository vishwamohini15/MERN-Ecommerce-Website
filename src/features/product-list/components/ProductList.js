import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {

  selectAllproducts,
  fetchAllproductasync,
  fetchproductsByFilterasync,
  selecttotalItems,
  selectBrands,
  selectCategories,
  fetchBrandasync,
  fetchCategoryasync,
} from '../productSlice';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon} from '@heroicons/react/20/solid'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../../app/constants';


const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order:'dec', current: false },
  { name: 'Price: Low to High', sort: 'price', order:'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order:'dec', current: false },
]

let filters=[]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function ProductList() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
    const products=useSelector(selectAllproducts)
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const totalItems=useSelector(selecttotalItems)

 filters = [
  {
    id: 'category',
    name: 'Category',
    options: categories,
  },

  {
    id: 'brand',
    name: 'brand',
options: brands,
  },
 
]


    const [filter, setfilter]=useState({})
    const [sort, setsort]=useState({})

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
   const [page, setpage]=useState(1);
    const handelfilters=(e,section,option)=>{
      console.log(e.target.checked);
      const newFilter={...filter}
      //TODO : on server it will support multiple categories
      if(e.target.checked){
        if (newFilter[section.id]) {
        newFilter[section.id].push(option.value)
        }
        else{
         newFilter[section.id]=[option.value]
        }
      }else{
        const index= newFilter[section.id] = newFilter[section.id].filter(el => el !== option.value);
        newFilter[section.id].splice(index,1)
      }
      console.log({newFilter});
      setfilter(newFilter)
      
    }

    const handelSort=(e,option)=>{
      const sort={_sort:option.sort, _order: option.order}
      setsort(sort)
      console.log({sort});
    }
    const handelPage=(page)=>{
      console.log({page});
   setpage(page)
    }

    useEffect(() => {
      const pagination= {_page:page,_limit:ITEMS_PER_PAGE}
      console.log("Dispatching with:", ({ filter, sort, pagination }));
      dispatch(fetchproductsByFilterasync({filter, sort, pagination}))

    }, [dispatch, filter, sort, page])

    useEffect(()=>{
      setpage(1)
    },[totalItems,sort])

     useEffect(()=>{
      dispatch(fetchBrandasync())
      dispatch(fetchCategoryasync())
    },[totalItems,sort])

  return (
    <div>
      <div>

      <div className="bg-white">
      <div>
     {/* Mobile filter dialog */}
       <MobileFilter handelfilters={handelfilters} mobileFiltersOpen={mobileFiltersOpen}
       setMobileFiltersOpen={setMobileFiltersOpen}
       ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1 ">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p
                        onClick={e=>handelSort(e, option)}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handelfilters={handelfilters}></DesktopFilter>

              {/* Product grid */}
              <div className="lg:col-span-3">
                 {/* this is list product page */}
                    <ProductGrid key={products.id}   products={products}></ProductGrid>
              </div>
              {/* product grid end */}

            </div>
          </section>

          {/* section of product and filters end */}
          
     <Pagination  page={page} setpage={setpage} handelPage={handelPage}
     totalItems={totalItems}
     ></Pagination>
        </main>
      </div>
    </div>



       
      </div>
    </div>
  );
}


function MobileFilter({mobileFiltersOpen, setMobileFiltersOpen, handelfilters}){

  return(
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={(e)=>handelfilters(e, section, option)}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
  )
}

function DesktopFilter({handelfilters}){
  return(
    <form className="hidden lg:block">
               

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={e=>handelfilters(e,section,option)}
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
  )
}

function Pagination({page, setpage,handelPage, totalItems=55}){
  const totalPages= Math.ceil(totalItems / ITEMS_PER_PAGE)
  return ( 
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
        <div
              onClick={(e)=>handelPage(page>1 ? page - 1 : page)}

          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
              onClick={()=>handelPage(page<totalPages? page + 1: page)}

          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
       <p className="text-sm text-gray-700">
      Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEMS_PER_PAGE > totalItems ? totalItems:page* ITEMS_PER_PAGE}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <div
              onClick={(e)=>handelPage(page>1 ? page - 1 : page)}
              
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {Array.from({length:totalPages}).map(
              (el,index)=>(
               <div
              onClick={(e)=>handelPage(index+1)}
              aria-current="page"
    className={`relative cursor-pointer z-10 inline-flex items-center ${index+1===page? 'bg-indigo-600 text-white': 'text-gray-400'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >

              {index+1}
            </div>
              )
            )}

           
          
            <div
              onClick={()=>handelPage(page<totalPages? page + 1: page)}

              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

function ProductGrid({products}){
  return(
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          
          {products.map((product) => (
            <Link  to={`/product-detail/${product.id}`}>
            <div key={product.id} className="group relative border-solid border-2 p-2 border-gray-200 ">
              <img
                alt={product.title}
                src={product.thumbnail}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-60"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <div href={product.thumbnail}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </div>
                  </h3>
                  <p className="mt-1  text-sm text-gray-500">
                    <StarIcon className='w-5 h-6 inline'></StarIcon> 
                    <span className='align-bottom'>{product.rating}</span>
                    </p>
                </div>
              <div>
                 
                <p className="text-sm block  font-medium text-gray-900"> 
                  ${Math.round(product.price*(1-product.discountPercentage/100))}</p>
                   <p className="text-sm  block font-medium text-gray-500 line-through"> ${product.price}</p>
              </div>

              </div>
            </div>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  )
}