"use client"
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import useStore from '@/src/helpers/store'
import axios, { all } from 'axios';
import { useRouter } from 'next/navigation';

const Catalogue = ({ }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const {category, setCategory } = useStore();
  const [sort, setSort] = useState(undefined);
  const router = useRouter();



  const getAllproducts = async () => {
    const res = await axios.get("/api/products/getAllproducts");
    if (res.status === 200) {
      setAllProducts(res.data.Products);
      setProducts(res.data.Products);
    }


  }

  useEffect(() => {
     getAllproducts()
    if (!category) {
      setCategory("All")
    }

  }, [])


  useEffect(() => {
    filterProducts()
  }, [category])

  useEffect(() => {
    sortProducts()
  }, [sort])


  const sortProducts = async () => {
    if (sort === "L-H") {
      products.sort((a, b) => a.price - b.price);
      setProducts(products)
    }
    if (sort === "H-L") {
      products.sort((a, b) => b.price - a.price);
      setProducts(products)
    }
    if (sort === "B-S") {
      setProducts(allProducts)
      filterProducts()
    }


  }


  const redirectPage = async (id) => {
    router.push(`/catalogue/${id}`)
  }

  const filterProducts = () => {
    if (category === 'All') {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) => product.category === category);
      setProducts(filteredProducts);
    }
  }

  return (
    <>
      <Header />
      <div className='px-16 m-5 mt-5'>
        <div className='text-3xl font-bold px-1 py-4 text-center'>Top-Selling Products <span className='text-gray-500'>{products.length}</span></div>
        <div className='flex justify-between mt-3 px-1 py-4'>
          <div className='flex gap-4'>
            <span>Filter: </span>
            <select name="Price" id="" defaultValue="price">
              <option value="price" className='hidden' disabled>Price</option>
              <option value="">$5</option>
              <option value="">$10</option>
              <option value="">$15</option>
            </select>
            <select name="Category" className='active:outline-none' onChange={(e) => setCategory(e.target.value)} defaultValue={category}>
              <option value="Category" className='hidden' disabled >Category</option>
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <span>Sort: </span>
            <select name="Category" onChange={(e) => setSort(e.target.value)} className='active:outline-none'>
              <option value="B-S" >Best-selling</option>
              <option value="L-H">Price, Low-High</option>
              <option value="H-L">Price, High-Low</option>
            </select>

          </div>
        </div>
        <div>
          <section className="text-gray-600 px-1 py-4 body-font">
            <div className="container px-1 py-4 mx-auto">
              <div className="flex flex-wrap -m-4">
                {
                  products.map((e) => {
                    return <div key={e._id} onClick={() => redirectPage(e._id)} className="lg:w-1/4 md:w-1/2 p-4 w-full">
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