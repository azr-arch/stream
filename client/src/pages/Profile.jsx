import React from "react";
import { logoutUser } from "../services/firebase";

const Profile = () => {
  return (
    <div>
      {/* page will be developed in future for now lets, only use basic logoutButton */}
      <button
        className="bg-white text-black px-4 py-2 mt-5"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
