import React from "react";
import {
  Link,
  Form,
  useNavigate,
  useLocation,
  useNavigation,
  redirect,
} from "react-router-dom";
import { registerUser } from "../services/firebase";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await registerUser({ username, email, password });
    return redirect("/dashboard");
  } catch (e) {
    console.log(e);
  }
  return null;
};

const Register = () => {
  const { state } = useNavigation();

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-center mb-8 text-xl font-medium">Register</h1>
      <Form className="space-y-6" method="post">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              required
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={state === "submitting"}
            className={`${
              state === "submitting" && "opacity-50"
            } opac flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            {state === "submitting" ? "Hold up!" : "Register"}
          </button>
        </div>
      </Form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member ?
        <Link
          to={"/"}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-4"
        >
          Log in!
        </Link>
      </p>
    </div>
  );
};

export default Register;
