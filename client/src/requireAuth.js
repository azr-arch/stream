import React from "react";
import { auth } from "./config/firebase";
import { redirect } from "react-router-dom";

export const requireAuth = async (request) => {
  //wil use request params to provide descriptive message of redirecting in future!
  const isLogged = localStorage.getItem("loggedIn") || false;

  if (!isLogged) {
    // when user is not logged in
    throw redirect("/");
  }
  return null;
};
