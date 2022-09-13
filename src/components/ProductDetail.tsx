/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prod } from "../features/product/productSlice";
import "../index.css";

const DetailSkeleton = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse  md:space-y-0 md:space-x-8 md:flex md:items-center"
    >
      <div className="flex justify-center items-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg
          className="w-12 h-12 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
        </svg>
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ProductDetail = () => {
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
    <div className="min-w-screen min-h-screen bg-gray-300">
      <div className=" container h-screen w-screen flex items-center justify-center">
        {loading ? (
          <DetailSkeleton />
        ) : (
          <div className="relative px-4 py-8 mx-auto w-full md:w-3/4 md:h-5/6 border bg-slate-100 shadow-2xl rounded-xl">
            <div className=" w-full flex flex-col md:flex-row">
              <div className="aspect-w-1 aspect-h-1 md:w-lg flex justify-center items-center">
                <img
                  alt={details.name}
                  className=" aspect-square inset-0  object-cover rounded-xl"
                  src={details.avatar}
                />
              </div>

              <div className="sticky top-0 w-full md:w-1/2 pl-5">
                <div className="flex flex-col mt-8">
                  <div className="max-w-full">
                    <h1 className="text-3xl font-semibold text-gray-900">
                      {details.name}
                    </h1>
                  </div>
                  <span className="text-3xl text-black font-bold mt-4">
                    ${details.price}
                  </span>
                  <span className="text-lg text-gray-700 font-medium mt-4 pr-16">
                    <span className=" text-base text-gray-600">
                      Category :{" "}
                    </span>
                    {details.category}
                  </span>
                  <span className="text-lg text-gray-700 font-medium mt-1 pr-16">
                    <span className=" text-base text-gray-600">
                      Developer's Email :{" "}
                    </span>
                    {details.developerEmail}
                  </span>
                </div>
                <div>
                  <h3 className=" text-base text-gray-600 font-medium mt-4">
                    Product description:
                  </h3>
                  <p className=" text-sm text-gray-700 font-semibold md:text-clip md:overflow-hidden">
                    {details.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
