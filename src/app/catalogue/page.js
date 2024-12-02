"use client"
import React, { useEffect } from 'react'
import Header from '../Components/Header'
import useStore from '@/src/helpers/store'
import axios from 'axios';

const Catalogue = () => {
  const {products,setProducts} = useStore();
  useEffect(() => {
  const getAllProducts = async () => {
    const res = await axios.get("/api/products/getAllproducts");
    if(res.status === 200){
      setProducts(res.data.Products)
      console.log(res.data.Products,products)
    }
  }
  getAllProducts()
  }, [])
  
  return (
    <>
      <Header />
      <div className='px-16 m-5 mt-5'>
        <div className='text-3xl font-bold px-1 py-4 text-center'>Top-Selling Products</div>
        <div className='flex justify-between mt-3 px-1 py-4'>
          <div className='flex gap-4'>
            <span>Filter: </span>
            {/* <select name="Price" id="" defaultValue="price">
              <option value="price" className='hidden' disabled>Price</option>
              <option value="">$5</option>
              <option value="">$10</option>
              <option value="">$15</option>
            </select>
            <select name="Category" className='active:outline-none' defaultValue="Category">
              <option value="Category" className='hidden' disabled >Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select> */}
          </div>
          <div>
            <span>Sort: </span>
            {/* <select name="Category" className='active:outline-none' id="">
              <option value="" selected>Best-selling</option>
              <option value="Men">Price, Low-High</option>
              <option value="Women">Price, High-Low</option>
            </select> */}
          </div>
        </div>
        <div>
          <section className="text-gray-600 px-1 py-4 body-font">
            <div className="container px-1 py-4 mx-auto">
              <div className="flex flex-wrap -m-4">
                {
                  products.map((e) => {
                    console.log(e)
                   return <div key={e._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-cover hover:scale-125 transition-all duration-300 object-center w-full h-full block" src={e.imageLink} />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{e.category}</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{e.name}</h2>
                      <p className="mt-1">${e.price}</p>
                    </div>
                  </div>
                  })
                }
             
              </div>
            </div>
          </section>

        </div>

      </div>
    </>
  )
}

export default Catalogue