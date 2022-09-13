/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import ProductCard from "./ProductCard";
import { fetchProducts, prod } from "../features/product/productSlice";
import Navbar from "./Navbar";
import Skeleton from "./Skeleton";


function Home() {
  const store = useAppSelector((store) => store.persistedReducer) 
  const dispatch = useAppDispatch();
  const [filter,setFilter] = useState<string>("");
  const [products,setProducts] = useState<prod[]>(store.products);

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  const updateFilter = (val:string) => {
    setFilter(val);
  }

  const skeletonArr = [1,2,3,4,5,6,7,8];

  useEffect(() => {
    if(filter === "") {
      setProducts(store.products)
      return;
    }
    const filterArr = products.filter(p => p.category === filter);
    setProducts(filterArr);
  },[filter, store.products])

  return (
        <>
        <div className='flex flex-wrap justify-center items-center min-w-screen min-h-screen bg-gray-300'>
        <Navbar filter={filter} updateFilter = {updateFilter} />
        <div className="mt-20 w-11/12  h-auto antialiased text-gray-900 font-sans p-6 ">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {store.loading
            ? skeletonArr.map((skeleton,i) => { 
              return(<Skeleton key={i} />)})
            : products &&
            products.map((prod) => <ProductCard key={prod._id} prod={prod} />)}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;
