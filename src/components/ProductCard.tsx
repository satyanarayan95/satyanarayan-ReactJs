
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../features/hooks";
import { AddFavourites, prod, RemoveProduct } from "../features/product/productSlice";

type cardProps  = {
    prod: prod
}

function ProductCard({prod} : cardProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  return (
          <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            <div
              className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            >
              <div className="relative pb-48 overflow-hidden border-b rounded-sm border-gray-300">
                <img
                  className="absolute inset-0 h-full w-full object-cover"
                  src={prod.avatar}
                  alt=""
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                  {prod.category}
                </span>
                <h2 className="mt-2 mb-2  font-bold">
                  {prod.name}
                </h2>
                <p className="text-xs truncate ...">
                  {prod.description}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="font-bold text-md">Rs. {prod.price}</span>&nbsp;
                  <div className=" flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={prod.favourited ? 'red' : 'gray'} className="w-5 h-5 mr-3 cursor-pointer" onClick={()=> dispatch(AddFavourites(prod._id))}>
                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray" className="w-5 h-5 mr-3 cursor-pointer" onClick={()=> dispatch(RemoveProduct(prod._id))}>
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>

                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full">
                <button className=" p-2 text-lg text-gray-600 cursor-pointer hover:text-gray-800 hover:text-xl mb-2" onClick={() =>  {navigate(`/details/${prod._id}`)}}>See Details</button>
                </div>
            </div>
          </div>

  );
}

export default ProductCard;
