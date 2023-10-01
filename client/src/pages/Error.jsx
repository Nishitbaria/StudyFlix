import React from "react";
import  {Link} from "react-router-dom"; 

function Error() {
  return (
    <div className="grid h-screen px-4  place-content-center bg-gray-900">
  <div className="text-center">
    <h1 className=" font-black text-gray-200 text-9xl text-white">404</h1>

    <p
      className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
    >
      Uh-oh!
    </p>

    <p className="mt-4 text-gray-500 text-white mb-4">
      We can't find that page.
    </p>

    <Link
      to="/"
      className=" glow-on-hover text-white  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Go Back Home
    </Link>
  </div>
  </div>
  );
}

export default Error;