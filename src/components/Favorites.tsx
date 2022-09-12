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
  }, []);

  return (
    <>
      <div className="w-11/12  h-auto antialiased text-gray-900 font-sans p-6 ">
        <h1 className=" text-3xl mb-10">Favorites</h1>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            {favProducts &&
              favProducts.map((prod) => (
                <ProductCard key={prod._id} prod={prod} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Favourites;
