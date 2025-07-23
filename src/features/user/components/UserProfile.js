import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInuser, updateUserAsync } from '../../auth/authSlice'; // Re-included as requested
import { selectUserInfo } from '../userSlice'; // Re-included as requested
import { useForm } from 'react-hook-form';

export default function Userprofile() {
  const [paymentMethod, setpaymentMethod] = useState('cash'); // Original state, kept as requested
  const [selectedEditIndex, setSelectedIndex] = useState(-1);
  const [showAddAddressForm, SetshowAddAddressForm] = useState(false); // Original state setter name, kept as requested

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch, // Kept watch as it was in original code
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  // Effect to reset the form with the selected address data when selectedEditIndex changes
  useEffect(() => {
    if (selectedEditIndex !== -1 && user && user.addresses && user.addresses[selectedEditIndex]) {
      reset(user.addresses[selectedEditIndex]);
    } else if (selectedEditIndex === -1 && !showAddAddressForm) {
      // If no address is selected for editing AND we're not showing the add form, reset the form
      reset();
    }
  }, [selectedEditIndex, user, reset, showAddAddressForm]);

  // Handle form submission for editing an address
  // This function now receives the form data directly from react-hook-form
  const handelEdit = (addressUpdate) => { // Removed 'index' from parameters as it's now 'selectedEditIndex'
    const newUser = { ...user, addresses: [...(user.addresses || [])] }; // Deep copy for immutability, defensive check
    newUser.addresses.splice(selectedEditIndex, 1, addressUpdate); // Use selectedEditIndex
    dispatch(updateUserAsync(newUser));
    setSelectedIndex(-1);
    reset(); // Reset form after edit
  };

  // Handle opening the edit form for a specific address
  const handleEditForm = (index) => {
    setSelectedIndex(index);
    SetshowAddAddressForm(false); // Hide add address form when editing
  };

  // Handle cancelling the edit form
  const handleCancelEdit = () => {
    setSelectedIndex(-1); // Close the edit form
    reset(); // Clear the form fields
  };

  const handelRemove = (e, index) => { // Original signature, kept as requested
    const newUser = { ...user, addresses: [...(user.addresses || [])] }; // for shallow copy issue, defensive check
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handelAdd = (address) => {
    const newUser = { ...user, addresses: [...(user.addresses || []), address] }; // Defensive check for addresses array
    dispatch(updateUserAsync(newUser));
    SetshowAddAddressForm(false); // Original state setter name, kept as requested
    reset(); // Clear the form fields after successful submission
  };

  const handlePayment = (e) => {
    // Original empty function, kept as requested
  };

  const handleAddress = (e) => {
    // Original empty function, kept as requested
  };

  // New function for the "Add New Address" button click
  const handleAddAddressClick = () => {
    SetshowAddAddressForm(true); // Show the add address form
    setSelectedIndex(-1); // Ensure no edit form is open
    reset(); // Clear form fields when opening add form
  };

  // --- Conditional Rendering for the entire component if user is null ---
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="mx-auto mt-12 bg-slate-200 max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Name : {user.name ? user.name : 'new user'}
            </h1>

            <h3 className="text-4xl font-bold tracking-tight text-red-500">
              Email address : {user.email}
            </h3>

          </div>


          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              onClick={handleAddAddressClick} // Calling the new dedicated function
              type="button" // IMPORTANT: Changed to type="button"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Address
            </button>

            {showAddAddressForm ? (
              // Add New Address Form
              <form className='bg-white px-5 py-8 mt-12' noValidate
                onSubmit={handleSubmit(handelAdd)} // Submit handler for adding new address
              >
                <div className="space-y-12">

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...register("name", { required: "name is required" })}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                      </div>


                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", { required: "email is required" })}
                            type="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                          phone
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                          <input
                            id="phone"
                            {...register("phone", { required: "phone is required" })}
                            type="tel"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...register("street", { required: "street is required" })}
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", { required: "city is required" })}
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            id="state"
                            {...register("state", { required: "state is required" })}
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pincode" className="block text-sm/6 font-medium text-gray-900">
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="postal-code"
                            {...register("pincode", { required: "pincode is required" })}
                            type="text"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        SetshowAddAddressForm(false); // Hide the form
                        reset(); // Clear form fields
                      }}
                      className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>


                </div>

              </form>
            ) : null}

            <p className="mt-0.5 text-sm text-gray-500">Your Addressh</p> {/* Original typo, kept as requested */}
            {user.addresses && user.addresses.length > 0 ? ( // Added conditional check for addresses
              user.addresses.map((address, index) => (
                <div key={address.id || index}> {/* Added key for list items */}
                  {selectedEditIndex === index ? (
                    // Edit Form
                    <form className='bg-white px-5 py-8 mt-12' noValidate
                      onSubmit={handleSubmit(handelEdit)} // Submit handler calls handelEdit with form data
                    >
                      <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  id="name"
                                  {...register("name", { required: "name is required" })}
                                  type="text"
                                  autoComplete="given-name" // Original autocomplete, kept
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                              </div>
                            </div>


                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", { required: "email is required" })} // Original validation, kept
                                  type="email"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                phone
                              </label>
                              <div className="mt-2 grid grid-cols-1">
                                <input
                                  id="phone"
                                  {...register("phone", { required: "phone is required" })}
                                  type="tel"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="street"
                                  {...register("street", { required: "street is required" })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  id="city"
                                  {...register("city", { required: "city is required" })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  id="state"
                                  {...register("state", { required: "state is required" })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="pincode" className="block text-sm/6 font-medium text-gray-900">
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  id="postal-code"
                                  {...register("pincode", { required: "pincode is required" })}
                                  type="text"
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button" // Important: set to type="button" to prevent form submission
                            onClick={handleCancelEdit} // Call the cancel function
                            className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>


                      </div>

                    </form>
                  ) : null}
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
                        onClick={() => handleEditForm(index)}
                        type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <button
                        onClick={e => handelRemove(e, index)} // Original signature, kept
                        type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-4 text-sm text-gray-500">No addresses added yet.</p> // Fallback if no addresses
            )}


          </div>
        </div>
      </div>
    </div>
  );
}
