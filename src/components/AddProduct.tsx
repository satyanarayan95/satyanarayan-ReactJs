import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const AUTH_BEARER =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdHlhbmFyYXlhbi5wYXRyYTU0OTVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL3NhdHlhbmFyYXlhbjk1IiwiaWF0IjoxNjYyOTAxNjc2LCJleHAiOjE2NjMzMzM2NzZ9.A1r2qm2zFI1196yR9nb9NTHnUtptgfppOIBe-EbxlFk";
  const BASE_URL = `https://upayments-studycase-api.herokuapp.com/api/products`;
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [developerEmail, setDeveloperEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const addPost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !name ||
      !category ||
      !developerEmail ||
      !avatar ||
      !description ||
      !price
    ) {
      alert("All fields are mandatory");
      return;
    }
    const data = { name, description, category, avatar, developerEmail, price };
    const res = await axios.post(BASE_URL, data, {
      headers: { Authorization: `Bearer ${AUTH_BEARER}` },
    });
    navigate("/");
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-16 border rounded-md">
      <form>
        <form className="mb-4">
          <h2 className="text-xl font-bold text-black text-center">
            Add Product Details
          </h2>
        </form>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Product name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="iphone"
            required
          />
        </div>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="400"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Hobby">Hobby</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="avatar"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Avatar Url
          </label>
          <input
            type="text"
            id="avatar"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            placeholder="https://xyc/photo.png"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="developerEmail"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Developer Email
          </label>
          <input
            type="email"
            id="developerEmail"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            placeholder="john.doe@company.com"
            value={developerEmail}
            onChange={(e) => setDeveloperEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
            placeholder="product description ......"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded text-sm font-bold text-gray-50 transition duration-200"
          onClick={(e) => {
            addPost(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
