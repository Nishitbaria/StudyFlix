/** @format */

import React from "react";

const Studentobj = [
  {
    name: "Nishitbaria",
    Number: 2101201128,
  },
  {
    name: "Jayesh yadav",
    Number: 2101201078,
  },
  {
    name: "kartik bhatiya",
    Number: 2101201089,
  },
  {
    name: "Vraj parikh",
    Number: 2101201192,
  },
];

const jsonStudentobj = JSON.stringify(Studentobj);

export default function Test() {
  console.log(jsonStudentobj); // Log the JSON string to the console

  return (
    <div>
      <h1 className="text-center text-white justify-center flex m-auto items-center text-5xl">
        fdn
      </h1>
      <div>
        {Studentobj.map((item) => (
          <div
            className={`text-center justify-center flex m-auto items-center text-5xl`}
            key={item.Number}
          >
            <div>{item.name}</div>
            <div>{item.Number}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
