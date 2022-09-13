import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";

type data = {
  name: string;
  category: string;
  developerEmail: string;
  description: string;
  price: number;
  avatar: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  developerEmail: Yup.string()
    .email("Invalid email format")
    .required("Required"),
  description: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  avatar: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});

function AddProduct2() {
  const navigate = useNavigate();
  const AUTH_BEARER =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhdHlhbmFyYXlhbi5wYXRyYTU0OTVAZ21haWwuY29tIiwiZ2l0aHViIjoiaHR0cHM6Ly9naXRodWIuY29tL3NhdHlhbmFyYXlhbjk1IiwiaWF0IjoxNjYyOTAxNjc2LCJleHAiOjE2NjMzMzM2NzZ9.A1r2qm2zFI1196yR9nb9NTHnUtptgfppOIBe-EbxlFk";
  const BASE_URL = `https://upayments-studycase-api.herokuapp.com/api/products`;

  const initialValues: data = {
    name: "",
    category: "",
    developerEmail: "",
    description: "",
    price: 0,
    avatar: "",
  };

  const onSubmit = async (values: data) => {
    cogoToast.loading("saving data", { position: "top-right" });
    try {
      const res = await axios.post(BASE_URL, values, {
        headers: { Authorization: `Bearer ${AUTH_BEARER}` },
      });
      cogoToast
        .success("saved successfully", { position: "top-right" })
        .then(() => {
          navigate("/");
        });
    } catch (error) {
      cogoToast.error("some error occurred", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center min-w-screen min-h-screen bg-gray-300">
      <div className="max-w-2xl  bg-white p-12 border rounded-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <div className="mb-2">
                  <h2 className="text-xl font-bold text-black text-center">
                    Add Product Details
                  </h2>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Product name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    placeholder="iphone"
                  />
                  <ErrorMessage
                    name="name"
                    className=" text-red-500 text-sm mx-0 my-0"
                    component={"div"}
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
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                      placeholder="400"
                    />
                    <ErrorMessage
                      name="price"
                      className=" text-red-500 text-sm mx-0 my-0"
                      component={"div"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      aria-label="Default select example"
                      id="category"
                      name="category"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Hobby">Hobby</option>
                    </Field>
                    <ErrorMessage
                      name="category"
                      className=" text-red-500 text-sm mx-0 my-0"
                      component={"div"}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Avatar Url
                  </label>
                  <Field
                    type="text"
                    id="avatar"
                    name="avatar"
                    className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    placeholder="https://xyc/photo.png"
                  />
                  <ErrorMessage
                    name="avatar"
                    className=" text-red-500 text-sm mx-0 my-0"
                    component={"div"}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="developerEmail"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Developer Email
                  </label>
                  <Field
                    type="email"
                    id="developerEmail"
                    name="developerEmail"
                    className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    placeholder="john.doe@company.com"
                  />
                  <ErrorMessage
                    name="developerEmail"
                    className=" text-red-500 text-sm mx-0 my-0"
                    component={"div"}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="w-full p-2 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
                    placeholder="product description ......"
                  />
                  <ErrorMessage
                    name="description"
                    className=" text-red-500 text-sm mx-0 my-0"
                    component={"div"}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 ${
                    !formik.isValid || formik.isSubmitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-fuchsia-600 hover:bg-fuchsia-700"
                  } rounded text-sm font-bold text-gray-50 cursor-pointer transition duration-200`}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default AddProduct2;
