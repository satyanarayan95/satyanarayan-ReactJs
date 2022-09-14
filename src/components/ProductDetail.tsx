/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { prod } from "../features/product/productSlice";
import "../index.css";

const DetailSkeleton = () => {
  return (
    <div className="px-4 py-8 mx-auto border w-[70vw] bg-slate-100 shadow-2xl rounded-xl min-h-[400px] flex items-center">
      <div
        role="status"
        className="space-y-8 animate-pulse  md:space-y-0 md:space-x-8 md:flex md:items-center"
      >
        <div className="flex justify-center items-center w-full p-4 h-80 bg-gray-300 rounded  dark:bg-gray-700">
          <svg
            className="w-full h-full text-gray-200"
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
    </div>
  );
};

export const ProductDetail = () => {
  const [details, setDetails] = useState<prod>({} as prod);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<string>();

  const baseUrl: string = process.env.REACT_APP_BASE_URL as string;
  const token: string = process.env.REACT_APP_AUTH_BEARER as string;
  const url = `${baseUrl}/api/products/${params.id}`;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { product } = res.data;
      setDetails(product);
      setLoading(false);
    };
    fetchDetails();
  }, []);
  return (
    <div className=" bg-gray-300 h-screen mx-4 md:mx-0 w-screen flex items-center justify-center">
      {loading ? (
        <DetailSkeleton />
      ) : (
        <div className=" px-4 py-8 mx-auto border w-[70vw] bg-slate-100 shadow-2xl rounded-xl">
          <div className=" w-full flex flex-col md:flex-row">
            <div className="w-80 h-80">
              <img
                alt={details.name}
                className=" inset-0 w-full h-full object-cover rounded-xl"
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
                  <span className=" text-base text-gray-600">Category : </span>
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
  );
};

export default ProductDetail;
