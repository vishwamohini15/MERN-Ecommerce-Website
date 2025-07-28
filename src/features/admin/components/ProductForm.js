import React, { useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { clearSelectedproduct, createProductAsync, fetchproductByIDasync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../product-list/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'



const ProductForm = () => {
   const {
      register,
      handleSubmit,
      setValue,
      reset,
      watch,
      formState: { errors }} = useForm()
     const brands=useSelector(selectBrands)
      const categories=useSelector(selectCategories)
      const dispatch=useDispatch();
      const params= useParams();
      const selectedproduct=useSelector(selectProductById)

      useEffect(() => {
        if(params.id){
          dispatch(fetchproductByIDasync(params.id))
        }else{
         dispatch(clearSelectedproduct())
         
        }
      }, [params.id, dispatch]) 
      
      useEffect(() => {
        if(selectedproduct && params.id){
           setValue('title', selectedproduct.title);
        setValue('description', selectedproduct.description);
        setValue('brand', selectedproduct.brand);
        setValue('price', selectedproduct.price);
        setValue('categories', selectedproduct.categories);
        setValue('discountPercentage', selectedproduct.discountPercentage);
        setValue('stock', selectedproduct.stock);
        setValue('thumbnail', selectedproduct.thumbnail);
        setValue('image1', selectedproduct.images[0]);
        setValue('image2', selectedproduct.images[1]);
        setValue('image3', selectedproduct.images[2]);


        }
        
      }, [selectedproduct, params.id, setValue])
      

      const handledelete=()=>{
        const product={...selectedproduct}
        product.deleted=true;
        dispatch(updateProductAsync(product))
      }
  return (
    <form
     noValidate  className="space-y-6" onSubmit={handleSubmit((data)=>{
                  console.log(data);
                  const product={...data}
                  product.images=[product.image1,product.image2,product.image3]
                  product.rating=0;
                  delete product['image1']
                  delete product['image2']
                  delete product['image3']
                  product.price= +product.price;
                  product.stock= +product.stock;
                  product.discountPercentage= +product.discountPercentage;

                    console.log(product);
                    
                    if(params.id){
                      product.id=params.id
                    product.rating=selectedproduct.rating || 0;
                      dispatch(updateProductAsync(product))
                      reset()
                    }else{
                      dispatch(createProductAsync(product))
                      reset()
                    }
                        })}
    >
      <div className="space-y-12 bg-white py-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Add product</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                product name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="title"
                    {...register('title',{
                      required:'title is required',
                    })}
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                   {...register('description',{
                      required:'description is required',
                    })}
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            <p className='mt-3 text-sm leading-6 to-gray-600'>write a few sentenc about product</p>
            </div>

                  <div className="col-span-full">
              <label htmlFor="brand" className="block text-sm/6 font-medium text-gray-900">
                Brand
              </label>
              <div className="mt-2">
                <select
                 {...register('brand',{
                      required:'brand is required',
                    })}
                >
                  <option value="">--choose brand--</option>
                  {brands.map((brand)=>(
                    <option value={brand.value}>{brand.label}</option> ))}
                </select>
              </div>
            </div>

             <div className="col-span-full">
              <label htmlFor="categories" className="block text-sm/6 font-medium text-gray-900">
                categories
              </label>
              <div className="mt-2">
                <select 
                 {...register('categories',{
                      required:'categories is required',
                    })}
                >
                  <option value="">--choose brand--</option>
                  {categories.map((categore)=>(
                    <option value={categore.value}>{categore.label}</option> ))}
                </select>
              </div>
            </div>


                 <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="price"
                    {...register('price',{
                      required:'price is required',
                      min:1,
                      max:10000
                    })}
                    type="number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
       
        <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm/6 font-medium text-gray-900">
                discountPercentage
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="discountPercentage"
                    {...register('discountPercentage',{
                      required:'discountPercentage is required',
                      min:0,
                      max:100
                    })}
                    type="number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm/6 font-medium text-gray-900">
                stock
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="stock"
                     {...register('stock',{
                      required:'stock is required',
                      min:0,
                    })}
                    type="number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="sm:col-span-4">
              <label htmlFor="thumbnail" className="block text-sm/6 font-medium text-gray-900">
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="thumbnail"
                     {...register('thumbnail',{
                      required:'thumbnail is required',
                    })}
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

             <div className="sm:col-span-4">
              <label htmlFor="image1" className="block text-sm/6 font-medium text-gray-900">
                Image 1
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="image1"
                     {...register('image1',{
                      required:'image1 is required',
                    })}
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

             <div className="sm:col-span-4">
              <label htmlFor="image2" className="block text-sm/6 font-medium text-gray-900">
                Image 2
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="image2"
                     {...register('image2',{
                      required:'image2 is required',
                    })}
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

             <div className="sm:col-span-4">
              <label htmlFor="image3" className="block text-sm/6 font-medium text-gray-900">
                Image 3
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  
                  <input
                    id="image3"
                      {...register('image3',{
                      required:'image3 is required',
                    })}
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

     

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">By email</legend>
              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="comments"
                        name="comments"
                        type="checkbox"
                        aria-describedby="comments-description"
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
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        aria-describedby="candidates-description"
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
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        aria-describedby="offers-description"
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
                  <div className="text-sm/6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>

          
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>

       {selectedproduct && <button
          onClick={handledelete}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          DELETE
        </button> }

        <button
          type="submit"
          onSubmit={handleSubmit}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>

  )
}


export default ProductForm
