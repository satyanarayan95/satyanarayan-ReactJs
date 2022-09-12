import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [category,setCategory] = useState<string>("");
  return (
    <nav className=" z-50 fixed top-0 h-16 w-full flex flex-wrap items-center justify-between  bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <h1 className="sm:text-3xl text-center text-2xl font-medium title-font mb-4 text-gray-900">
            Product Home Page
        </h1>
        <div className="flex w-fit h-fit ">
        <div className="flex w-fit h-fit justify-center items-center">
            <label
              htmlFor="category"
              className="block mb-2 text-lg font-medium text-gray-700"
            >
              Filter:
            </label>
            <select
              className=" mx-2 form-select appearance-none block w-fit px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              aria-label="Default select example"
              value={category}
              onChange = {(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Hobby">Hobby</option>
            </select>
          </div>
        <button className=" px-4 rounded-md bg-slate-200 hover:bg-slate-700 hover:text-white text-gray-800 border-gray-300 text-lg border shadow-sm ring-offset-2 " onClick={() =>  {navigate(`/add`)}}> Add Product</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
