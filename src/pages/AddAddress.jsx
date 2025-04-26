import React, { useState } from 'react'
import { assets } from '../assets/assets'

const InputField = ({type , placeholder ,name , handleChange ,address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none
     text-ray-500 focus:border-primary transition' type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    />
)

function AddAddress() {

    const [address,setAddress] = useState({
        firstName : "",
        lastName : '',
        email :"",
        street : "",
        city : "",
        state : "",
        zipcode : "",
        Country : "",
        phone : "",
    })

    const handleChange = (e)=>{
        const { name ,value } = e.target 

        setAddress((prevAddress)=>({
            ...prevAddress,
            [name] :value
          }))
          console.log(address)
    }

   const onSubmitHandler = async (e)=>{
      e.preventDefault()
   }


    return (
    <div className='mt-16 pb-16'>
  <p className='text-2xl md:text-3xl text-gray-500'>
    Add Shipping <span className='font-semibold text-primary'>Address</span>
  </p>
  <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
    <div className='flex-1 max-w-md'>
      <form  onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
        <div  className='grid grid-cols-2 gap-4'>
        <InputField type="text" placeholder='First Name'   name='firstName' handleChange={handleChange} address={address}  />
        <InputField  handleChange={handleChange}  name='lastName' placeholder='Last Name' address={address} type="text" />
        </div>

        <InputField  handleChange={handleChange}  name='email' placeholder='Email' address={address} type="email" />
        <InputField  handleChange={handleChange}  name='street' placeholder='Street' address={address} type="text" />

        <div className='grid grid-cols-2 gap-4'>
        <InputField  handleChange={handleChange}  name='city' placeholder='City' address={address} type="text" />
        <InputField  handleChange={handleChange}  name='state' placeholder='State' address={address} type="text" />
        </div>

        <div className='grid grid-cols-2 gap-4'>
        <InputField  handleChange={handleChange}  name='zipcode' placeholder='Zip Code' address={address} type="number" />
        <InputField  handleChange={handleChange}  name='country' placeholder='Country' address={address} type="text" />
        </div>

        <InputField  handleChange={handleChange}  name='phone' placeholder='Phone' address={address} type="number" />

        <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
        Save address
        </button>
      </form>
    </div>

    <img
      className='md:mr-16 mb-16 md:mt-0'
      src={assets.add_address_iamge}
      alt='Add Address'
    />
  </div>
</div>
  )
}

export default AddAddress
