/** @format */

import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div class="grid h-screen px-4  place-content-center dark:bg-gray-900">
    <div class="text-center">
      <h1 class="font-bold text-white text-9xl ">404</h1>
  
      <p
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
      >
        Uh-oh!
      </p>
  
      <p class="mt-4 text-gray-500 dark:text-white">
        We can't find that page.
      </p>
  
      <Link
        to="/"
        className="glow-on-hover inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-richblack-800 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </Link>
    </div>
  </div>
  );
}
