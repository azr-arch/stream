import React from "react";
import { Link, Form, useNavigation } from "react-router-dom";
import { loggingUser } from "../services/firebase";
import { redirect } from "react-router-dom";
// import { requireAuth } from "../requireAuth";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await loggingUser({ email, password });
    return redirect("/dashboard");
  } catch (e) {
    console.log(e);
  }
  return null;
};

const Login = () => {
  const { state } = useNavigation();

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-center mb-8 text-xl font-medium">Login</h1>
      <Form className="space-y-6" method="post">
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
            {state === "submitting" ? "Logging in..." : "Log In"}
          </button>
        </div>
      </Form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <Link
          to={"/register"}
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-4"
        >
          Create an account!
        </Link>
      </p>
    </div>
  );
};

export default Login;
