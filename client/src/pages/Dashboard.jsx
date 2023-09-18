import React, { useState } from "react";
import { Await, defer, useLoaderData, Link } from "react-router-dom";
// import { requireAuth } from "../requireAuth";
import { userObserver } from "../services/firebase";

// export const loader = async ({ request }) => {
//   return defer({ user: getCurrUserInfo() });
// };

const Dashboard = () => {
  // const loaderData = useLoaderData();

  // function renderDetails(user) {
  //   return (
  //     <>
  //       <div className="w-full mb-8 flex items-center justify-center">
  //         <p className="text-xl text-white font-bold">
  //           Welcome, {user.displayName}
  //         </p>
  //       </div>

  //       <div className="bg-[#18181b] w-full rounded-t-lg px-4 py-5 flex flex-col items-start gap-3 text-white">
  //         <p className="text-xl font-semibold">Start Streaming with Us!</p>
  //         <p className="">
  //           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
  //           consequuntur voluptatum iure excepturi repellendus, enim consequatur
  //           magnam amet, modi dolorum a itaque alias nam reprehenderit eaque
  //           blanditiis dignissimos dicta doloremque?
  //         </p>

  //         <Link
  //           to="livestream"
  //           className="px-4 py-1 rounded-sm mt-5 bg-violet-600 text-white"
  //         >
  //           Stream
  //         </Link>
  //       </div>
  //     </>
  //   );
  // }
  // console.log(loaderData);
  return (
    <div className="w-full first-letter:flex flex-col items-start">
      <div className="w-full mb-8 flex items-center justify-center">
        <p className="text-xl text-white font-bold">Welcome!</p>
      </div>

      <div className="bg-[#18181b] w-full rounded-t-lg px-4 py-5 flex flex-col items-start gap-3 text-white">
        <p className="text-xl font-semibold">Start Streaming with Us!</p>
        <p className="">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
          consequuntur voluptatum iure excepturi repellendus, enim consequatur
          magnam amet, modi dolorum a itaque alias nam reprehenderit eaque
          blanditiis dignissimos dicta doloremque?
        </p>

        <Link
          to="livestream"
          className="px-4 py-1 rounded-sm mt-5 bg-violet-600 text-white"
        >
          Stream
        </Link>
      </div>
      {/* <React.Suspense fallback={<p className="text-white">Loading...</p>}>
        <Await resolve={loaderData.user}>{(user) => renderDetails(user)}</Await>
      </React.Suspense> */}
    </div>
  );
};

export default Dashboard;
