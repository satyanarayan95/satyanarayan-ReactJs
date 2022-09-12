/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prod } from "../features/product/productSlice";

function ProductDetail() {
  const [details, setDetails] = useState<prod>({} as prod);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<string>();
  const AUTH_BEARER =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdHlhbmFyYXlhbi5wYXRyYTU0OTVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL3NhdHlhbmFyYXlhbjk1IiwiaWF0IjoxNjYyOTAxNjc2LCJleHAiOjE2NjMzMzM2NzZ9.A1r2qm2zFI1196yR9nb9NTHnUtptgfppOIBe-EbxlFk";
  let BASE_URL = `https://upayments-studycase-api.herokuapp.com/api/products/${params.id}`;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${AUTH_BEARER}` },
      });
      const { product } = res.data;
      setDetails(product);
      setLoading(false);
    };
    fetchDetails();
  }, []);
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gray-100 border-gray-400 rounded-md border w-fit">
      <div className="container py-10 mx-auto">
        {loading ? (
          <h1>Loading Data</h1>
        ) : (
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={details.name}
              className="lg:w-1/3 w-1/2 object-cover object-center border rounded-md border-gray-200"
              src={details.avatar}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
                {details.name}
              </h1>
              <p className="leading-relaxed">{details.description}</p>
              <h3 className="title-font font-medium text-xl text-gray-900 mt-5">
                Developer Email:{" "}
                <span className="text-gray-700">{details.developerEmail}</span>
              </h3>
              <div className="flex mt-12 justify-between">
                <span className="title-font font-medium text-xl text-gray-900">
                  Category :
                  <span className="text-gray-700">{details.category}</span>
                </span>
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs. <span className="text-gray-700">{details.price}</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetail;
