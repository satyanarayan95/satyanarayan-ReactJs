import React, { useEffect, useState } from "react";
import { useAppSelector } from "../features/hooks";
import ProductCard from "./ProductCard";
import { prod } from "../features/product/productSlice";

function Favourites() {
  const store = useAppSelector((store) => store.persistedReducer.products);
  const [favProducts, setFavProducts] = useState<prod[]>();

  useEffect(() => {
    const favs = store.filter((p) => p.favourited);
    setFavProducts(favs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  return (
    <>
    <div className='flex flex-wrap justify-center items-center min-w-screen min-h-screen bg-gray-300'>
    <nav className=" z-50 fixed top-0 h-12 w-full flex flex-wrap items-center justify-between  bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <h1 className="sm:text-3xl text-center text-2xl font-medium title-font mb-4 text-gray-900">
            Favourites
        </h1>
        </div>
        </nav>
      <div className="w-11/12  h-auto antialiased text-gray-900 font-sans p-6  mt-8">
        {
          favProducts?.length
          ?  <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {favProducts &&
              favProducts.map((prod) => (
                <ProductCard key={prod._id} prod={prod} />
              ))}
          </div>
        </div>
        : <EmptyContent />
        }
      </div>
      </div>
    </>
  );
}

export default Favourites;

const EmptyContent = () => {
  return(
    <div className="flex flex-col">

          <div className="flex flex-col items-center">
            <div className="text-gray-600 font-medium text-sm md:text-xl lg:text-2xl mt-8">
              No favourite item found. Try adding some.
            </div>
          </div>
        </div>
  )
}
