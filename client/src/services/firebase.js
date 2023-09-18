import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { redirect } from "react-router-dom";

export const registerUser = async (creds) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );

    const currentUser = auth.currentUser;

    const userData = {
      userId: createdUser.user.uid,
      username: creds.username.toLowerCase(),
      email: creds.email.toLowerCase(),
      dateCreated: Date.now(),
    };

    await Promise.all([
      updateProfile(currentUser, { displayName: creds.username }),
      addDoc(collection(db, "users"), userData),
    ]);

    setLoggedIn(true);
  } catch (e) {
    console.error(e);
    throw new Error("error occured");
  }
};

export const loggingUser = async (creds) => {
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );

    setLoggedIn(true);
  } catch (e) {
    console.error(e);
  }
};

function setLoggedIn(flag) {
  //if flag is true, add loggedIn as true
  if (flag) {
    localStorage.setItem("loggedIn", true);
  } else {
    //else  just remove the item
    localStorage.removeItem("loggedIn");
  }
}

export const getCurrUserInfo = async () => {
  const user = auth.currentUser;
  return user;
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    setLoggedIn(false);
    window.location.href = "/";
  } catch (e) {
    console.error(
      `something went wrong when signing out! please try again later, ${e}`
    );
  }
};

//this acts as a observer for each pages that need user information about signed-in user for more see firebase auth > web > get started DOCS
export const userObserver = async (setterFunc) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //user is signed in
      console.log(user);
      setterFunc(user);
    } else {
      // user is signed out
      console.log(user);
      setterFunc({ displayName: "undefined" });
    }
  });
};
